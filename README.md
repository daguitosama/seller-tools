# My baseline Remix template for Cloudflare Pages

- [Remix Docs](https://remix.run/docs)

This starter comes with: 
- Tailwindcss



## Bash utility
```bash
function :remix() {

    # :remix [command] [option]
    #        new                                        creates new remix project from a template
    #                  cp                               uses this cloudflare pages template

    if [ "$1" = 'new' ]; then
        if [ "$2" = 'cp' ]; then
            pnpm create remix@latest --template https://github.com/daguitosama/remix-cloudflare-pages-baseline
        else
            echo ""$2" template is not available"
        fi
    else
        echo ""$1" command not available"
    fi

}
```