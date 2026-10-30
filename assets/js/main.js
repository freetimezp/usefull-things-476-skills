/* =========================================
   SKILL//NEXUS
   Interactive skill intelligence
========================================= */
let boost = 0;

const skills = [
    {
        name: "HTML5",
        value: 90 + boost,
        category: "MARKUP ENGINE",
        description: "Structure & semantics",
        level: "ADVANCED",
    },
    {
        name: "CSS3",
        value: 80,
        category: "VISUAL ENGINE",
        description: "Styling & composition",
        level: "ADVANCED",
    },
    {
        name: "JAVASCRIPT",
        value: 75,
        category: "LOGIC ENGINE",
        description: "Interaction & behavior",
        level: "PROFICIENT",
    },
    {
        name: "GSAP",
        value: 50,
        category: "MOTION ENGINE",
        description: "Animation & transitions",
        level: "INTERMEDIATE",
    },
    {
        name: "PHP",
        value: 70,
        category: "SERVER ENGINE",
        description: "Backend development",
        level: "PROFICIENT",
    },
    {
        name: "PHOTOSHOP",
        value: 40,
        category: "CREATIVE ENGINE",
        description: "Image & visual editing",
        level: "DEVELOPING",
    },
];

/* =========================================
   GENERATE SKILL MODULES
========================================= */

const grid = document.querySelector("#skills-grid");

function renderSkills() {
    grid.innerHTML = skills
        .map((skill, index) => {
            const number = String(index + 1).padStart(2, "0");

            return `
                <article class="skill-card">

                    <div class="card-top">
                        <span class="card-index">
                            MODULE / ${number}
                        </span>

                        <span class="card-status">
                            ● ${skill.level}
                        </span>
                    </div>

                    <div class="card-main">

                        <div class="skill-ring"
                            data-value="${skill.value}">

                            <div class="ring-inner">
                                <span class="ring-value">0</span>
                                <span class="ring-unit">PERCENT</span>
                            </div>

                        </div>

                        <div class="card-info">
                            <h3>${skill.name}</h3>
                            <p>${skill.category}</p>
                            <p>${skill.description}</p>
                        </div>

                    </div>

                    <div class="card-bottom">
                        <span>CAPABILITY INDEX</span>
                        <span class="card-arrow">↗</span>
                    </div>

                </article>
            `;
        })
        .join("");
}

/* =========================================
   TOTAL SKILL INDEX
========================================= */

function calculateTotal() {
    const total = skills.reduce((sum, skill) => sum + skill.value, 0);

    return Math.round(total / skills.length);
}

/* =========================================
   ANIMATE SKILL RINGS
========================================= */

function animateSkills(boost = 0) {
    const cards = document.querySelectorAll(".skill-card");

    cards.forEach((card, index) => {
        const ring = card.querySelector(".skill-ring");
        const valueElement = card.querySelector(".ring-value");
        const value = Number(ring.dataset.value);

        const progress = { value: 0 };
        const counter = { value: 0 };

        const delay = 0.25 + index * 0.12;

        gsap.to(progress, {
            value,
            duration: 1.8,
            delay,
            ease: "power3.out",
            onUpdate: () => {
                ring.style.setProperty("--progress", `${progress.value}%`);
            },
        });

        gsap.to(counter, {
            value,
            duration: 1.8,
            delay,
            ease: "power3.out",
            onUpdate: () => {
                valueElement.textContent = Math.round(counter.value + boost);
            },
        });
    });
}

/* =========================================
   SKILL CARDS REVEAL
========================================= */

function revealCards() {
    gsap.from(".section-heading", {
        scrollTrigger: null,
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
    });

    gsap.fromTo(
        ".skill-card",
        {
            y: 60,
            opacity: 0,
            scale: 0.96,
        },
        {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            delay: 0.15,
        },
    );
}

/* =========================================
   INTERACTIVE MOUSE LIGHT
========================================= */

function initCardInteractions() {
    const cards = document.querySelectorAll(".skill-card");

    cards.forEach((card) => {
        card.addEventListener("pointermove", (event) => {
            const rect = card.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        });
    });
}

/* =========================================
   AMBIENT BACKGROUND MOVEMENT
========================================= */

function initAmbient() {
    const ambient = document.querySelector(".ambient-one");

    window.addEventListener("pointermove", (event) => {
        const x = (event.clientX / window.innerWidth - 0.5) * 35;
        const y = (event.clientY / window.innerHeight - 0.5) * 35;

        gsap.to(ambient, {
            x,
            y,
            duration: 1.5,
            ease: "power2.out",
            overwrite: "auto",
        });
    });
}

/* =========================================
   NEXUS BOOST / OVERDRIVE
========================================= */

function initBoost() {
    const button = document.querySelector("#boost-button");
    const flash = document.querySelector(".boost-flash");

    let isBoosting = false;

    button.addEventListener("click", () => {
        if (isBoosting) return;

        isBoosting = true;

        const cards = document.querySelectorAll(".skill-card");
        const tracks = document.querySelectorAll(".stream-track");

        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;

        // Random boost intensity: 0.1 - 2.0
        boost = Number((Math.random() * 8 + 0.1).toFixed(2));
        const boostValue = document.querySelector("#boost-value");
        animateSkills(boost);

        gsap.to(boostValue, {
            innerText: boost,
            duration: 0.5,
            snap: { innerText: 0.01 },
            ease: "power2.out",
            onUpdate: function () {
                boostValue.textContent = `${Number(boostValue.textContent.replace("×", "")).toFixed(2)}×`;
            },
        });

        // Activate overdrive
        document.body.classList.add("overdrive");

        button.querySelector(".boost-title").textContent = "ACTIVE";

        // Background energy burst
        if (!reducedMotion) {
            gsap.timeline()
                .to(flash, {
                    opacity: 1,
                    duration: 0.25,
                })
                .to(flash, {
                    opacity: 0,
                    duration: 0.9,
                });
        }

        // Accelerate skill modules
        if (!reducedMotion) {
            gsap.fromTo(
                cards,
                {
                    scale: 1,
                    y: 0,
                },
                {
                    scale: 1 + boost * 0.015,
                    y: -5 * boost,
                    duration: 0.35,
                    stagger: 0.04,
                    yoyo: true,
                    repeat: 1,
                    ease: "power2.inOut",
                },
            );

            // Accelerate learning signals
            tracks.forEach((track) => {
                track.style.setProperty(
                    "--stream-speed",
                    `${Math.max(8, 38 / (1 + boost * 3))}s`,
                );
            });
        }

        // Return to normal after 5 seconds
        gsap.delayedCall(5, () => {
            boost = 0;

            gsap.to(boostValue, {
                innerText: 0,
                duration: 0.5,
                snap: { innerText: 0.01 },
                onUpdate: function () {
                    boostValue.textContent = `${Number(boostValue.textContent.replace("×", "")).toFixed(2)}×`;
                },
            });

            document.body.classList.remove("overdrive");
            animateSkills();

            button.querySelector(".boost-title").textContent = "BOOST";

            tracks.forEach((track, index) => {
                track.style.setProperty(
                    "--stream-speed",
                    index === 0 ? "38s" : "48s",
                );
            });

            isBoosting = false;
        });
    });
}

/* =========================================
   INITIALIZATION
========================================= */

function init() {
    // Generate HTML from skill data
    renderSkills();

    // Reveal skill modules
    revealCards();

    // Animate circular indicators
    animateSkills();

    // Interactive effects
    initCardInteractions();
    initAmbient();

    initBoost();
}

window.addEventListener("DOMContentLoaded", init);
