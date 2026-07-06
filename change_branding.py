import os
import argparse

def replace_branding(root_dir, replacements):
    exclude_dirs = {'.git', 'node_modules', 'dist', 'build', '.astro', '__pycache__', 'scratch'}
    exclude_exts = {'.png', '.jpg', '.jpeg', '.gif', '.ico', '.svg', '.webp', '.pdf', '.zip', '.lock'}

    for root, dirs, files in os.walk(root_dir):
        dirs[:] = [d for d in dirs if d not in exclude_dirs]
        
        for file in files:
            ext = os.path.splitext(file)[1].lower()
            if ext in exclude_exts or file == 'yarn.lock' or file == 'package-lock.json':
                continue
                
            filepath = os.path.join(root, file)
            if os.path.basename(filepath) == 'change_branding.py':
                continue
            
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
            except Exception as e:
                continue
                
            new_content = content
            for old_term, new_term in replacements.items():
                if new_term: 
                    new_content = new_content.replace(old_term, new_term)
                    
            if new_content != content:
                try:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Updated: {filepath}")
                except Exception as e:
                    print(f"Failed to write: {filepath}")

def main():
    parser = argparse.ArgumentParser(description="Change Web-Check branding")
    parser.add_argument('--name', help="New app name")
    parser.add_argument('--slug', help="New app slug")
    parser.add_argument('--url', help="New app URL")
    parser.add_argument('--repo', help="New GitHub repo")
    parser.add_argument('--author', help="New author name")
    parser.add_argument('--desc', help="New description")
    
    args = parser.parse_args()
    
    # We use the previous placeholder values as the old strings to replace
    replacements = {
        "My App": args.name,
        "my-app": args.slug,
        "https://myapp.com": args.url,
        "janedoe/my-app": args.repo,
        "Jane Doe": args.author,
        "A custom tool for analysing websites": args.desc
    }
    
    replacements = {k: v for k, v in replacements.items() if v is not None}
    
    if not replacements:
        print("No replacements provided.")
        return
        
    print(f"Starting branding replacement with:")
    for k, v in replacements.items():
        print(f"  '{k}' -> '{v}'")
        
    replace_branding('.', replacements)
    print("Branding replacement complete!")

if __name__ == '__main__':
    main()
