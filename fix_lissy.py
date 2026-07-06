import os

def fix_branding():
    exclude_dirs = {'.git', 'node_modules', 'dist', 'build', '.astro', '__pycache__', 'scratch'}
    exclude_exts = {'.png', '.jpg', '.jpeg', '.gif', '.ico', '.svg', '.webp', '.pdf', '.zip', '.lock'}

    for root, dirs, files in os.walk('.'):
        dirs[:] = [d for d in dirs if d not in exclude_dirs]
        for file in files:
            ext = os.path.splitext(file)[1].lower()
            if ext in exclude_exts or file in ['yarn.lock', 'package-lock.json', 'fix_lissy.py']:
                continue
                
            filepath = os.path.join(root, file)
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
            except:
                continue
                
            new_content = content
            new_content = new_content.replace('lissy93', 'Subhan-Haider')
            new_content = new_content.replace('Lissy93', 'Subhan-Haider')
            new_content = new_content.replace('site-scan.xyz', 'site-scan.subhan.tech')
            
            if new_content != content:
                try:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Fixed: {filepath}")
                except:
                    pass

if __name__ == '__main__':
    fix_branding()
