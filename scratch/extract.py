import re

def extract_text():
    with open('c:/Users/dell/Downloads/marudeni/docx-content.txt', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Strip base64 image data
    clean_content = re.sub(r'data:image/[^;]+;base64,[a-zA-Z0-9+/=]+', '[IMAGE_DATA]', content)
    
    # Remove HTML tags to get plain text
    text = re.sub(r'<[^>]+>', ' ', clean_content)
    text = re.sub(r'\s+', ' ', text).strip()
    
    with open('c:/Users/dell/Downloads/marudeni/scratch/clean-text.txt', 'w', encoding='utf-8') as out:
        out.write(text)

if __name__ == '__main__':
    extract_text()
