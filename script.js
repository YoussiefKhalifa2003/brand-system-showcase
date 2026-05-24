/*!
 * YK Studio Matrix - A Refined Website Concept
 * Website design and build by YK.
 * Signature: YK-STUDIO-MATRIX-2026-v1
 */
(function () {
    "use strict";

    const $ = (selector, root = document) => root.querySelector(selector);
    const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    console.log(
        "%cYK Studio Matrix",
        "font-size:24px;font-weight:900;color:#0b0b0b;background:#fff;padding:10px 14px;border:1px solid #0b0b0b;"
    );
    console.log(
        "%cWebsite design and build by YK. Signature: YK-STUDIO-MATRIX-2026-v1",
        "font-size:12px;color:#6f6f6f;"
    );

    /* ── Hero word-by-word reveal ───────────────────────────────── */
    function splitHeroTitle() {
        const title = document.querySelector("[data-split]");
        if (!title) return;

        const splitText = (node, target) => {
            const text = node.textContent.trim();
            target.textContent = "";
            text.split(/\s+/).forEach((word, i) => {
                const span = document.createElement("span");
                span.className = "split-word";
                span.textContent = word;
                span.style.transitionDelay = `${i * 70}ms`;
                target.appendChild(span);
                target.appendChild(document.createTextNode(" "));
            });
        };

        const nodes = Array.from(title.childNodes).filter(
            (node) => node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0)
        );

        const lines = nodes.map((node) => {
            const line = document.createElement("span");
            line.className = "split-line";

            if (node.nodeType === Node.ELEMENT_NODE) {
                const wrap = node.cloneNode(false);
                splitText(node, wrap);
                line.appendChild(wrap);
            } else {
                splitText(node, line);
            }

            return line;
        });

        title.innerHTML = "";
        lines.forEach((line) => title.appendChild(line));

        requestAnimationFrame(() => title.classList.add("is-ready"));
    }

    splitHeroTitle();


    /* ── Magnetic buttons ───────────────────────────────────────── */
    if (!isTouch && !prefersReducedMotion) {
        $$("[data-magnetic]").forEach((el) => {
            const strength = 18;
            el.addEventListener("mousemove", (event) => {
                const rect = el.getBoundingClientRect();
                const relX = event.clientX - rect.left - rect.width / 2;
                const relY = event.clientY - rect.top - rect.height / 2;
                el.style.transform = `translate(${(relX / rect.width) * strength}px, ${(relY / rect.height) * strength}px)`;
            });
            el.addEventListener("mouseleave", () => {
                el.style.transform = "";
            });
        });
    }

    /* ── 3D tilt ────────────────────────────────────────────────── */
    if (!isTouch && !prefersReducedMotion) {
        $$("[data-tilt]").forEach((el) => {
            const max = 6;
            el.addEventListener("mousemove", (event) => {
                const rect = el.getBoundingClientRect();
                const x = (event.clientX - rect.left) / rect.width - 0.5;
                const y = (event.clientY - rect.top) / rect.height - 0.5;
                el.style.transform = `perspective(900px) rotateX(${-y * max}deg) rotateY(${x * max}deg)`;
            });
            el.addEventListener("mouseleave", () => {
                el.style.transform = "";
            });
        });
    }

    /* ── Hero spotlight ─────────────────────────────────────────── */
    const heroSection = $(".hero");
    const heroSpotlight = $("#hero-spotlight");
    if (heroSection && heroSpotlight && !isTouch && !prefersReducedMotion) {
        heroSection.addEventListener("mousemove", (event) => {
            const rect = heroSection.getBoundingClientRect();
            heroSpotlight.style.transform = `translate3d(${event.clientX - rect.left - 270}px, ${event.clientY - rect.top - 270}px, 0)`;
        });
    }

    /* ── Status word rotator ────────────────────────────────────── */
    const statusWord = $("#status-word");
    if (statusWord) {
        const words = ["Composing", "Refining", "Drafting", "Crafting", "Designing"];
        let idx = 0;
        setInterval(() => {
            statusWord.classList.add("flip");
            setTimeout(() => {
                idx = (idx + 1) % words.length;
                statusWord.textContent = words[idx];
                statusWord.classList.remove("flip");
            }, 220);
        }, 2400);
    }

    /* ── Footer clock ───────────────────────────────────────────── */
    const footerTime = $("#footer-time");
    if (footerTime) {
        const updateClock = () => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, "0");
            const minutes = String(now.getMinutes()).padStart(2, "0");
            footerTime.textContent = `${hours}:${minutes} local`;
        };
        updateClock();
        setInterval(updateClock, 30000);
    }

    /* ── Header scroll + active nav ─────────────────────────────── */
    const header = $("#site-header");
    const progress = $("#progress");
    const sections = $$("section[id]");
    const navLinks = $$(".nav-menu a");
    function updateScroll() {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const current = window.scrollY;
        const percent = max > 0 ? (current / max) * 100 : 0;

        if (progress) progress.style.width = `${percent}%`;
        if (header) header.classList.toggle("scrolled", current > 8);

        let activeId = sections[0] ? sections[0].id : "";
        sections.forEach((section) => {
            if (section.offsetTop <= current + 140) activeId = section.id;
        });

        navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${activeId}`);
        });

    }

    let ticking = false;
    window.addEventListener("scroll", () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateScroll();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    /* ── Mobile menu ────────────────────────────────────────────── */
    const navMenu = $("#nav-menu");
    const menuBtn = $("#menu-btn");
    if (navMenu && menuBtn) {
        menuBtn.addEventListener("click", () => {
            const open = navMenu.classList.toggle("open");
            menuBtn.classList.toggle("open", open);
            menuBtn.setAttribute("aria-expanded", String(open));
        });

        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("open");
                menuBtn.classList.remove("open");
                menuBtn.setAttribute("aria-expanded", "false");
            });
        });
    }

    /* ── Smooth anchor scroll ───────────────────────────────────── */
    $$("a[href^='#']").forEach((link) => {
        link.addEventListener("click", (event) => {
            const id = link.getAttribute("href");
            if (!id || id === "#") return;
            const target = $(id);
            if (!target) return;
            event.preventDefault();
            window.scrollTo({
                top: target.getBoundingClientRect().top + window.scrollY - 90,
                behavior: prefersReducedMotion ? "auto" : "smooth",
            });
        });
    });

    /* ── Visitor journey panel ──────────────────────────────────── */
    const stageData = {
        attract: {
            kicker: "First impression",
            title: "Earn the attention before asking for anything.",
            copy: "The opening of the experience is shaped around one job: make a serious visitor stop scrolling and pay real attention.",
            items: [
                "Editorial hero with restrained type",
                "Live status and trust signals",
                "Quiet, confident calls to action",
            ],
        },
        convince: {
            kicker: "Building trust",
            title: "Make every section feel like proof.",
            copy: "Mid-page sections are designed to establish authority through composition, not volume. Each block answers a silent objection.",
            items: [
                "Working principles, clearly stated",
                "Proof matrix without bragging",
                "Editorial pull-quotes in voice",
            ],
        },
        convert: {
            kicker: "Quiet conversion",
            title: "Lower the friction of taking the next step.",
            copy: "Calls to action are placed where the visitor naturally pauses. The form is short, the tone is calm, the moment is deliberate.",
            items: [
                "Composed engagement layer",
                "Short, considered fields",
                "No urgency tricks, ever",
            ],
        },
        retain: {
            kicker: "After the click",
            title: "Stay in the memory after they close the tab.",
            copy: "A consistent visual identity, a small live detail, and a refined footer give the experience a long aftertaste.",
            items: [
                "Refined identity throughout",
                "Subtle live signals",
                "Composed closing footer",
            ],
        },
        compose: {
            kicker: "Composing the brand",
            title: "Tune the system around the business it serves.",
            copy: "The shell is fixed; the voice, copy, and proof are tuned around the brand. The result is a site that feels custom without being chaotic.",
            items: [
                "One language, many tones",
                "Reusable section archetypes",
                "Identity-led customisation",
            ],
        },
    };

    const stageTabs = $$(".industry-tab");
    const stageKicker = $("#stage-kicker");
    const stageTitle = $("#stage-title");
    const stageCopy = $("#stage-copy");
    const stageList = $("#stage-list");

    stageTabs.forEach((button) => {
        button.addEventListener("click", () => {
            const key = button.dataset.stage;
            const data = stageData[key];
            if (!data) return;

            stageTabs.forEach((tab) => {
                const isActive = tab === button;
                tab.classList.toggle("active", isActive);
                tab.setAttribute("aria-selected", String(isActive));
            });

            stageKicker.textContent = data.kicker;
            stageTitle.textContent = data.title;
            stageCopy.textContent = data.copy;
            stageList.innerHTML = data.items.map((item) => `<li>${item}</li>`).join("");
        });
    });

    /* ── Showcase filter ────────────────────────────────────────── */
    const filters = $$(".filter");
    const cards = $$(".work-card");

    filters.forEach((button) => {
        button.addEventListener("click", () => {
            const filter = button.dataset.filter;
            filters.forEach((item) => item.classList.toggle("active", item === button));
            cards.forEach((card) => {
                const match = filter === "all" || card.dataset.category === filter;
                card.classList.toggle("is-hidden", !match);
            });
        });
    });

    /* ── Quote rotator ──────────────────────────────────────────── */
    const quotes = [
        {
            text: "This is the kind of website that quietly makes any business look serious. The restraint and the rhythm are what sell it.",
            name: "Maya Sterling",
            role: "Brand Director",
        },
        {
            text: "It reads as confident without ever being loud. The whole page feels like it was designed by someone who knows when to stop.",
            name: "Omar Khalid",
            role: "Operations Lead",
        },
        {
            text: "The structure is so clean it almost disappears, which is the highest compliment you can pay a piece of design.",
            name: "Elena Voss",
            role: "Creative Director",
        },
    ];

    let quoteIndex = 0;
    const quoteText = $("#quote-text");
    const quoteName = $("#quote-name");
    const quoteRole = $("#quote-role");
    const quoteCard = $("#quote-card");

    function renderQuote(index) {
        const quote = quotes[index];
        if (!quoteText || !quoteName || !quoteRole || !quoteCard) return;

        quoteCard.animate(
            [
                { opacity: 1, transform: "translateY(0)" },
                { opacity: 0, transform: "translateY(8px)" },
            ],
            { duration: 180, easing: "ease-out" }
        ).onfinish = () => {
            quoteText.textContent = quote.text;
            quoteName.textContent = quote.name;
            quoteRole.textContent = quote.role;
            quoteCard.animate(
                [
                    { opacity: 0, transform: "translateY(8px)" },
                    { opacity: 1, transform: "translateY(0)" },
                ],
                { duration: 240, easing: "ease-out" }
            );
        };
    }

    $("#quote-next")?.addEventListener("click", () => {
        quoteIndex = (quoteIndex + 1) % quotes.length;
        renderQuote(quoteIndex);
    });
    $("#quote-prev")?.addEventListener("click", () => {
        quoteIndex = (quoteIndex - 1 + quotes.length) % quotes.length;
        renderQuote(quoteIndex);
    });

    /* ── Reveal on scroll ───────────────────────────────────────── */
    const revealItems = $$(".reveal");
    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
        );
        revealItems.forEach((item) => revealObserver.observe(item));
    } else {
        revealItems.forEach((item) => item.classList.add("visible"));
    }

    /* ── Counter animation ──────────────────────────────────────── */
    function animateCounter(el) {
        const target = Number(el.dataset.count);
        if (!Number.isFinite(target)) return;

        const duration = 1600;
        const start = performance.now();
        const pad = String(el.dataset.count).startsWith("0") ? String(el.dataset.count).length : 0;

        function step(now) {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            const value = Math.round(target * eased);
            el.textContent = pad > 0 ? String(value).padStart(pad, "0") : String(value);
            if (t < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    const counters = $$("[data-count]");
    if ("IntersectionObserver" in window) {
        const counterObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        counterObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );
        counters.forEach((counter) => counterObserver.observe(counter));
    } else {
        counters.forEach((counter) => {
            counter.textContent = counter.dataset.count;
        });
    }

    /* ── Text scramble ──────────────────────────────────────────── */
    function scramble(el) {
        const final = el.dataset.scramble;
        if (!final) return;
        const glyphs = "0123456789.";
        const duration = 900;
        const start = performance.now();

        function step(now) {
            const t = Math.min((now - start) / duration, 1);
            const reveal = Math.floor(final.length * t);
            let out = "";
            for (let i = 0; i < final.length; i += 1) {
                if (i < reveal) {
                    out += final[i];
                } else if (final[i] === ".") {
                    out += ".";
                } else {
                    out += glyphs[Math.floor(Math.random() * glyphs.length)];
                }
            }
            el.textContent = out;
            if (t < 1) requestAnimationFrame(step);
            else el.textContent = final;
        }
        requestAnimationFrame(step);
    }

    const scrambleEls = $$(".scramble");
    if ("IntersectionObserver" in window) {
        const scrambleObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        scramble(entry.target);
                        scrambleObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );
        scrambleEls.forEach((el) => scrambleObserver.observe(el));
    } else {
        scrambleEls.forEach((el) => {
            el.textContent = el.dataset.scramble;
        });
    }

    /* ── Contact form ───────────────────────────────────────────── */
    const form = $("#contact-form");
    const status = $("#form-status");
    if (form && status) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const data = new FormData(form);
            const email = String(data.get("email") || "").trim();

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                status.textContent = "Please enter a valid email address.";
                status.className = "form-status error";
                return;
            }

            status.textContent = "Note received. This demo form is ready to be wired to a backend.";
            status.className = "form-status success";
            form.reset();
        });
    }

    /* ── Footer year ────────────────────────────────────────────── */
    const year = $("#year");
    if (year) year.textContent = String(new Date().getFullYear());

    updateScroll();
})();
