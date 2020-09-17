const { gsap } = require('gsap/dist/gsap');
const { ScrollTrigger } = require('gsap/dist/ScrollTrigger');

    console.log('main.js loaded');
 
    // const gsap = require('gsap/dist/gsap');
    // const ScrollTrigger = require('gsap/dist/ScrollTrigger');

    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline();

    tl.fromTo('#hero-overlay',
        {
            duration: 2,
            width: "70%",
        },
        {
            width: "0%",
            autoRound:false, 
            ease: 'Power1.ease0ut'
        })
        .from('#photo', {
            duration: 1,
            autoAlpha: 0,
            y: 30,
            ease: 'Power3.ease0ut'
        })
        .from('#text', {
            duration: 1,
            autoAlpha: 0,
            y: 30,
            ease: 'Power1.ease0ut'
        })
        .from('#about', {
            backgroundColor: 'white',
            // autoAlpha: 0,
            // y: 30,
            ease: 'Power1.ease0ut'
        });


    const aboutRev = gsap.from('#about .container', {
        duration: 0.1,
        autoAlpha: 0,
        y: 30,
        ease: 'Power1.ease0ut'
    });
        ScrollTrigger.create({
            trigger: '#about',
            start: 'top top',
            end: '#banner',
            markers: false,
            scrub: 1,
            animation: aboutRev,
            // onUpdate: () => console.log('Projekt Alwayssun'),
        });
        const banRev = gsap.from('#banner', {
            duration: 1,
            autoAlpha: 0,
            y: 30,
            ease: 'Power1.ease0ut'
        });
            ScrollTrigger.create({
                trigger: '#banner',
                start: 'top-=300px center',
                end: '+=250px',
                markers: false,
                scrub: 1,
                animation: banRev,
                // onUpdate: () => console.log('Projekt Alwayssun'),
            });