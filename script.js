{\rtf1\ansi\ansicpg932\cocoartf2868
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // \uc0\u12506 \u12540 \u12472 \u12364 \u35501 \u12415 \u36796 \u12414 \u12428 \u12383 \u26178 \u12398 \u20966 \u29702 \
document.addEventListener('DOMContentLoaded', () => \{\
    console.log("Welcome to Kitchen Car Website!");\
\
    // \uc0\u12473 \u12512 \u12540 \u12473 \u12473 \u12463 \u12525 \u12540 \u12523 \u65288 \u12490 \u12499 \u12434 \u12463 \u12522 \u12483 \u12463 \u12375 \u12383 \u12392 \u12365 \u12395 \u12422 \u12387 \u12367 \u12426 \u21205 \u12367 \u65289 \
    const links = document.querySelectorAll('nav a');\
    links.forEach(link => \{\
        link.addEventListener('click', (e) => \{\
            e.preventDefault();\
            const targetId = link.getAttribute('href');\
            const targetSection = document.querySelector(targetId);\
            window.scrollTo(\{\
                top: targetSection.offsetTop - 70, // \uc0\u12504 \u12483 \u12480 \u12540 \u20998 \u12434 \u24341 \u12367 \
                behavior: 'smooth'\
            \});\
        \});\
    \});\
\
    // \uc0\u12473 \u12463 \u12525 \u12540 \u12523 \u26178 \u12395 \u35201 \u32032 \u12434 \u12405 \u12431 \u12387 \u12392 \u34920 \u31034 \u12373 \u12379 \u12427 \u28436 \u20986 \u65288 \u12362 \u12414 \u12369 \u65289 \
    const sections = document.querySelectorAll('.container');\
    const options = \{\
        threshold: 0.2\
    \};\
\
    const observer = new IntersectionObserver((entries) => \{\
        entries.forEach(entry => \{\
            if(entry.isIntersecting) \{\
                entry.target.style.opacity = '1';\
                entry.target.style.transform = 'translateY(0)';\
            \}\
        \});\
    \}, options);\
\
    sections.forEach(section => \{\
        section.style.opacity = '0';\
        section.style.transform = 'translateY(20px)';\
        section.style.transition = 'all 0.6s ease-out';\
        observer.observe(section);\
    \});\
\});}