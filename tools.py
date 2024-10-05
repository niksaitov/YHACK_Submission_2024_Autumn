def extract_codes(json_data):
    course_codes = {item['code'] for item in json_data}
    return list(set(course_codes))

