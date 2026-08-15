import re
import base64

def extract_images():
    with open('c:/Users/dell/Downloads/marudeni/docx-content.txt', 'r', encoding='utf-8') as f:
        content = f.read()

    # Find all base64 images
    matches = re.findall(r'src="data:image/jpeg;base64,([^"]+)"', content)
    print(f"Found {len(matches)} JPEG images")

    for i, data in enumerate(matches):
        try:
            img_data = base64.b64decode(data)
            filename = f"c:/Users/dell/Downloads/marudeni/scratch/extracted_img_{i}.jpg"
            with open(filename, 'wb') as img_file:
                img_file.write(img_data)
            print(f"Saved {filename}")
        except Exception as e:
            print(f"Error decoding image {i}: {e}")

    # Check for png too
    matches_png = re.findall(r'src="data:image/png;base64,([^"]+)"', content)
    print(f"Found {len(matches_png)} PNG images")
    for i, data in enumerate(matches_png):
        try:
            img_data = base64.b64decode(data)
            filename = f"c:/Users/dell/Downloads/marudeni/scratch/extracted_img_png_{i}.png"
            with open(filename, 'wb') as img_file:
                img_file.write(img_data)
            print(f"Saved {filename}")
        except Exception as e:
            print(f"Error decoding image {i}: {e}")

if __name__ == '__main__':
    extract_images()
