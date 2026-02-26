What is the purpose of the router outlets in the generation.html and generations.html?
 

generations/id/pokedex
    - When I refresh the browser, the page is empty and nothing loads back in
    - Why? 
        Refreshing a page will cause everything in the site to reload. This reinstaniates your services,
        so when the page is reloaded nothing is fetched.
        You are only fetching on the way to the pokedex, not in the pokedex itself. You can also make this happen by
        going directly to the URL without using the buttons (The fetch never happened at all since we jumped the middle components)







