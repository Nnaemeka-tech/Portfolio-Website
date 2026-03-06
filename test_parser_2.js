const fs = require('fs');
const text = `
Okay, here is a 5-minute documentary script on runaway black holes, complete with a dramatic hook, scientific facts, additional fascinating details, and an existential ending.

---

## Script: The Cosmic Renegades: Runaway Black Holes

**Documentary Title:** The Cosmic Renegades

**(0:00 - 0:30) SCENE 1: THE VOID UNLEASHED**

**(VISUAL: Deep space. Majestic nebulae slowly drift. Stars twinkle. Then, a subtle shift – a shimmering, distorted region appears, hinting at something unseen. The accretion disk of a massive black hole slowly comes into view, swirling menacingly.)**

**(SOUND: Deep, resonant cosmic hum. Ethereal, low-frequency soundscape. Distant, almost mournful chimes.)**

**NARRATOR (Voice, deep, contemplative):** For millennia, humanity has looked to the stars, seeking wonder, meaning… and sometimes, fear. We've charted constellations, marveled at supernovae, and come to understand the most terrifying titans of the cosmos: Black Holes. Gravitational leviathans so immense, not even light can escape their crushing embrace. They are the ultimate cosmic void, the universe's devourers.

**(0:30 - 1:30) SCENE 2: THE VIOLENT WALTZ**

**(VISUAL: Animation begins, showing two black holes in a tight binary orbit, spiraling inwards towards each other. The distortion of spacetime around them becomes increasingly apparent. The merger is depicted as a sudden, violent implosion into a single, larger black hole.)**

**(SOUND: The hum intensifies, becoming more guttural. As the black holes orbit, a subtle, rhythmic "whoosh" effect builds. The moment of merger is accompanied by a deep, powerful *thump* and a brief, sharp *shimmer* sound.)**

**NARRATOR:** We understand their immense hunger, their relentless pull. But what if these monsters, in their most cataclysmic union, could unleash a new, unprecedented terror? What if the birth of a single, super-sized black hole didn't just consume… but *fled*?

**(1:30 - 2:30) SCENE 3: THE COSMIC KICK**

**(VISUAL: An advanced simulation showing the gravitational waves radiating from the merging black hole binary. Crucially, the emission is depicted as *asymmetrical*, causing a visible recoil effect on the newly formed black hole, which then shoots off into the void at incredible speed, leaving a distorted trail.)**

**(SOUND: A swirling, high-pitched 'whoosh' sound, like air being rapidly displaced, builds and culminates in a sudden, sharp, almost violent 'crack' as the black hole accelerates. Then, a profound, eerie silence except for the distant hum.)**

**NARRATOR:** The universe is a grand symphony of forces, none more profound than gravity. When two black holes, locked in a deadly cosmic waltz, finally collide and coalesce, they don't just merge quietly. This event is so violent, so energetic, it rips through the very fabric of spacetime as gravitational waves. But here’s the unsettling truth: these waves are not always emitted perfectly symmetrically. It’s akin to firing a cannon from a boat – the powerful recoil propels the boat in the opposite direction. In this cosmic scenario, the 'recoil' doesn't just push space, it propels the newborn black hole itself.

**NARRATOR:** We call it a "recoil kick" – a colossal shove that can send a black hole hurtling through the cosmos at speeds unimaginable. Theoretical models suggest these runaway leviathans could reach staggering velocities of up to **five thousand kilometers per second** – over eleven million miles per hour. That’s fast enough to escape the gravitational pull of even the most colossal galaxies.

**(2:30 - 3:30) SCENE 4: THE ROGUE TITAN**

**(VISUAL: A vast, luminous spiral galaxy. A tiny, almost imperceptible dot (the runaway black hole) is seen tearing through it, subtly distorting nearby star lanes, then exiting the galaxy and disappearing into the intergalactic void. Then, a lonely black hole traveling through vast, dark intergalactic space.)**

**(SOUND: A low, menacing rumble slowly builds, overlaid with distant, ominous chimes. As the black hole exits the galaxy, the sound fades to an unsettling, profound silence, emphasizing its isolation.)**

**NARRATOR:** Imagine a cosmic rogue, a gravitational bullet, unleashed from its galactic home. A black hole, no longer tethered, plowing through star systems, disrupting stellar nurseries, ejecting planets, perhaps even entire stars from their orbits. This isn't just a theoretical curiosity; it's a new dimension of cosmic terror, a gravitational shark in the deepest, darkest ocean of space, no longer bound by the cosmic currents of its birth.

**(3:30 - 4:30) SCENE 5: HUNTING THE INVISIBLE**

**(VISUAL: Images from advanced telescopes – a long, luminous trail of shocked gas or newly forming stars, resembling a cosmic comet, with the black hole at its unseen head. Then, a simulation of a runaway supermassive black hole carrying a cluster of stars with it, like a tiny nomadic galaxy.)**

**(SOUND: Subtle, rising orchestral string section, conveying wonder, discovery, and the grandeur of scientific pursuit. Gentle, inquisitive electronic tones.)**

**NARRATOR:** Scientists, using gravitational wave detectors like LIGO and Virgo, have opened an entirely new window into these violent mergers, confirming the existence of these spacetime tremors. And the hunt for these rogue titans is on. Astronomers have already identified **candidate runaway black holes**, sometimes leaving astonishing evidence in their wake – colossal luminous trails of gas or newly forming stars, shocked and excited by the passage of these invisible giants.

**NARRATOR:** What’s even more profound is the potential for these cosmic outcasts to become truly unique entities. If a supermassive black hole is ejected from its galaxy, it doesn't necessarily travel alone. It could **carry with it a small entourage of stars**, bound by its immense gravity, becoming a nomadic star system. Imagine, a tiny galaxy, drifting through the intergalactic void, light-years from any other, a testament to the chaotic elegance of cosmic mechanics.

**(4:30 - 5:00) SCENE 6: THE COSMIC PERSPECTIVE**

**(VISUAL: Zoom out slowly from the runaway black hole, until it's just a tiny, fading spec. Continue zooming out to reveal a vast, awe-inspiring shot of the cosmic web – galaxies strung together like pearls. Finally, transition to a beautiful, serene shot of Earth from space, alone and fragile.)**

**(SOUND: The cosmic hum returns, but now more mournful, yet profoundly awe-inspiring. Distant, ethereal choir swells gently, then fades to a final, deep, resonating hum, and finally, silence.)**

**NARRATOR:** The universe continues to reveal its secrets, each discovery expanding our understanding, and often, our sense of profound vulnerability. Runaway black holes, these untethered engines of destruction, remind us of the raw, untamed power that governs the cosmos. We, on our small, blue planet, are but fleeting observers in this grand, terrifying ballet. Yet, it is our insatiable curiosity, our drive to understand these cosmic terrors, that ultimately defines us. To gaze into the abyss, not with despair, but with the courage to learn, to comprehend, and to marvel at the universe’s endless capacity for both creation and chaos. And perhaps, to truly understand our own fragile, yet miraculous existence within it.
`;

const scenes = [];

// Split by SCENE blocks (but loosely match SCENE X)
const blocks = text.split(/(?=\*\*\(\d+:\d+\s*-\s*\d+:\d+\)\s*SCENE\s*\d+:)/i);

// Skip the first block since it's the preamble
for (let i = 1; i < blocks.length; i++) {
    const block = blocks[i];

    // Extract VISUAL
    const visualRegex = /\*\*\(?VISUAL:\s*(.*?)\)?\*\*/i;
    const visualMatch = block.match(visualRegex);

    // Extract NARRATOR (can span multiple lines or multiple NARRATOR tags in same scene)
    // We want to combine all NARRATOR: sections within this scene block
    let narratorText = "";
    const narratorRegex = /\*\*NARRATOR(?:[^*]*)\*\*:([\s\S]*?(?=\*\*NARRATOR|$))/gi;
    let nMatch;
    while ((nMatch = narratorRegex.exec(block)) !== null) {
        narratorText += nMatch[1].trim() + "\n\n";
    }

    if (visualMatch) {
        scenes.push({
            sceneNumber: i,
            visual: visualMatch[1].trim(),
            narrator: narratorText.trim()
        });
    }
}

console.log(JSON.stringify(scenes, null, 2));
