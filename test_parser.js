const scriptText = `
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
`

const scenes = [];
// More robust split logic
const sceneBlocks = scriptText.split(/SCENE \d+.*?\*\*/i).slice(1);

sceneBlocks.forEach((block, index) => {
    // VISUAL is usually inside **(VISUAL: ...)**
    const visualMatch = block.match(/\(VISUAL:(.*?)\)/i);
    // Narrator can have a sub-tag like **NARRATOR (Voice, deep):**
    // Match everything after **NARRATOR...**: until the end of the block or next tag
    const narratorMatch = block.match(/\*\*NARRATOR.*?\*\*:([\s\S]*)/i);
    
    if (visualMatch && narratorMatch) {
        scenes.push({
            sceneNumber: index + 1,
            visual: visualMatch[1].trim(),
            narrator: narratorMatch[1].trim()
        });
    }
});

console.log(JSON.stringify(scenes, null, 2));
