import React from 'react'

const content = [   "LOGO", 
                    "The Anti-Covid Web App", 
                    "QR-code", 
                    "ICON", 
                    "www.anti-covid.com"
                ];

const Sidebar = () => {
    return (
        <aside className="main-sidebar">
            <div><img src={content[0]} alt="LOGO" /></div>
            <article>
                <header>
                    <h1>{content[1]}</h1>
                </header>
                <section>
                    <span>{content[2]}</span>
                    <img src={content[3]} alt="ICON" />
                </section>
            </article>
            <section>{content[4]}</section>
        </aside>
    );
}

export default Sidebar;