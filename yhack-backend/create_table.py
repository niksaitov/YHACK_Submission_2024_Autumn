#run: python create_table.py to populate table

from sentence_transformers import SentenceTransformer
from sqlalchemy import text

def create_courses_table(df, engine):
    # Generate embeddings for all descriptions at once. Batch processing makes it faster
    with engine.connect() as conn:
        with conn.begin():
            conn.execute(text("DROP TABLE IF EXISTS courses"))

            # Create the courses table with the new format if it doesn't already exist
            conn.execute(text("""
                CREATE TABLE IF NOT EXISTS courses (
                    courseNumber VARCHAR(4),
                    courseTitle VARCHAR(255),
                    crn BIGINT,
                    department VARCHAR(4),
                    description VARCHAR(1024),
                    distDesg VARCHAR(255),
                    meetingPattern VARCHAR(255),
                    prerequisites VARCHAR(1024),
                    description_vector VECTOR(DOUBLE, 384) 
                )
            """))
            
            # Insert course data into the table
            for index, row in df.iterrows():
                # Remove 'YC' prefix if it exists in distDesg
                distDesg = row['distDesg']
                if distDesg.startswith("YC"):
                    distDesg = distDesg[2:]  # Remove the first two characters ('YC')
                sql = text("""
                    INSERT INTO courses
                    (courseNumber, courseTitle, crn, department, description, distDesg, meetingPattern, prerequisites, description_vector) 
                    VALUES (:courseNumber, :courseTitle, :crn, :department, :description, :distDesg, :meetingPattern, :prerequisites, TO_VECTOR(:description_vector))
                """)
                conn.execute(sql, {
                'courseNumber': row['courseNumber'], 
                'courseTitle': row['courseTitle'], 
                'crn': row['crn'], 
                'department': row['department'], 
                'description': row['description'], 
                'distDesg': row['distDesg'], 
                'meetingPattern': row['meetingPattern'], 
                'prerequisites': row['prerequisites'], 
                'description_vector': str(row['description_vector'])
                })
