// Attendre que le DOM soit entièrement chargé
document.addEventListener('DOMContentLoaded', () => {

    // --- 0. TRADUCTIONS ET GESTION DE LA LANGUE ---
    const translations = {
        fr: {
            // Auth
            portfolioTitle: "Portfolio Géomatique",
            passwordPrompt: "Veuillez entrer le mot de passe pour continuer.",
            passwordPlaceholder: "Mot de passe",
            loginButton: "Entrer",
            incorrectPassword: "Mot de passe incorrect. Veuillez réessayer.",
            // UI
            menuTitle: "Ouvrir le menu et les filtres",
            menuHeader: "Menu & Filtres",
            closeMenuTitle: "Fermer le menu",
            filterStatus: "Filtrer par Statut",
            filterSkills: "Filtrer par Compétences",
            searchSkillPlaceholder: "Rechercher une compétence...",
            filterHardware: "Filtrer par Matériels",
            searchHardwarePlaceholder: "Rechercher un matériel...",
            filterSoftware: "Filtrer par Logiciels",
            searchSoftwarePlaceholder: "Rechercher un logiciel...",
            resetFilters: "Réinitialiser les filtres",
            information: "Informations",
            about: "À propos",
            legal: "Mentions Légales",
            closeDetailsTitle: "Fermer les détails",
            detailsPlaceholder: "Cliquez sur un marqueur sur la carte pour afficher les détails d'une mission ou d'une formation.",
            // Map
            basemapStandard: "Standard",
            basemapTopo: "Topographique",
            basemapSatellite: "Satellite",
            basemapNight: "Mode Nuit",
            markersOverlay: "Marqueurs",
            compassError: "Boussole non disponible",
            legendTitle: "Légende",
            // Details Panel
            noTitle: "Titre non disponible",
            description: "Description",
            domains: "Domaines",
            skills: "Compétences",
            hardware: "Matériels",
            software: "Logiciels",
            members: "Membres & Collaborateurs",
            viewMorePDF: "Voir plus (PDF)",
            // Modals
            aboutTitle: "À propos de ce portfolio",
            aboutBody: `<p>Cette carte interactive présente mon parcours académique et professionnel dans les domaines de la géomatique, de la topographie et de l'ingénierie.</p><p>Elle a été développée en utilisant <strong>Leaflet.js</strong> pour la cartographie, et est alimentée par un fichier <strong>JSON</strong> contenant toutes les données des missions, formations et projets.</p><p>Naviguez en cliquant sur les marqueurs pour découvrir les détails de chaque expérience.</p><p>Développé par Manuel Castet.</p>`,
            legalTitle: "Mentions Légales & Propriété",
            legalBody: `<p>Ce site est un portfolio personnel à but non-commercial.</p><p>L'accès à ce contenu est restreint. Les informations, données et documents présentés sur ce site sont la propriété intellectuelle de Manuel Castet et/ou des entités respectives mentionnées (écoles, entreprises, missions).</p><p>Toute reproduction, diffusion ou utilisation des contenus de ce site (données, images, code) sans autorisation préalable explicite est strictement interdite.</p><p>Les fonds de carte sont la propriété de leurs fournisseurs respectifs (OpenStreetMap, Esri, CartoDB, OpenTopoMap) et sont utilisés conformément à leurs licences.</p>`,
        },
        en: {
            portfolioTitle: "Geomatics Portfolio",
            passwordPrompt: "Please enter the password to continue.",
            passwordPlaceholder: "Password",
            loginButton: "Enter",
            incorrectPassword: "Incorrect password. Please try again.",
            menuTitle: "Open menu and filters",
            menuHeader: "Menu & Filters",
            closeMenuTitle: "Close menu",
            filterStatus: "Filter by Status",
            filterSkills: "Filter by Skills",
            searchSkillPlaceholder: "Search for a skill...",
            filterHardware: "Filter by Hardware",
            searchHardwarePlaceholder: "Search for hardware...",
            filterSoftware: "Filter by Software",
            searchSoftwarePlaceholder: "Search for software...",
            resetFilters: "Reset Filters",
            information: "Information",
            about: "About",
            legal: "Legal Notice",
            closeDetailsTitle: "Close details",
            detailsPlaceholder: "Click on a marker on the map to display the details of a mission or training.",
            basemapStandard: "Standard",
            basemapTopo: "Topographic",
            basemapSatellite: "Satellite",
            basemapNight: "Night Mode",
            markersOverlay: "Markers",
            compassError: "Compass not available",
            legendTitle: "Legend",
            noTitle: "Title not available",
            description: "Description",
            domains: "Domains",
            skills: "Skills",
            hardware: "Hardware",
            software: "Software",
            members: "Members & Collaborators",
            viewMorePDF: "View more (PDF)",
            aboutTitle: "About this portfolio",
            aboutBody: `<p>This interactive map presents my academic and professional background in the fields of geomatics, surveying, and engineering.</p><p>It was developed using <strong>Leaflet.js</strong> for mapping, and is powered by a <strong>JSON</strong> file containing all the data for missions, training, and projects.</p><p>Navigate by clicking on the markers to discover the details of each experience.</p><p>Developed by Manuel Castet.</p>`,
            legalTitle: "Legal Notice & Ownership",
            legalBody: `<p>This site is a personal, non-commercial portfolio.</p><p>Access to this content is restricted. The information, data, and documents presented on this site are the intellectual property of Manuel Castet and/or the respective entities mentioned (schools, companies, missions).</p><p>Any reproduction, distribution, or use of the contents of this site (data, images, code) without explicit prior authorization is strictly prohibited.</p><p>The basemaps are the property of their respective providers (OpenStreetMap, Esri, CartoDB, OpenTopoMap) and are used in accordance with their licenses.</p>`,
        },
        es: {
            portfolioTitle: "Portfolio de Geomática",
            passwordPrompt: "Por favor, introduzca la contraseña para continuar.",
            passwordPlaceholder: "Contraseña",
            loginButton: "Entrar",
            incorrectPassword: "Contraseña incorrecta. Por favor, inténtelo de nuevo.",
            menuTitle: "Abrir menú y filtros",
            menuHeader: "Menú y Filtros",
            closeMenuTitle: "Cerrar menú",
            filterStatus: "Filtrar por Estado",
            filterSkills: "Filtrar por Competencias",
            searchSkillPlaceholder: "Buscar una competencia...",
            filterHardware: "Filtrar por Materiales",
            searchHardwarePlaceholder: "Buscar un material...",
            filterSoftware: "Filtrar por Software",
            searchSoftwarePlaceholder: "Buscar un software...",
            resetFilters: "Restablecer filtros",
            information: "Información",
            about: "Acerca de",
            legal: "Aviso Legal",
            closeDetailsTitle: "Cerrar detalles",
            detailsPlaceholder: "Haga clic en un marcador en el mapa para ver los detalles de una misión o formación.",
            basemapStandard: "Estándar",
            basemapTopo: "Topográfico",
            basemapSatellite: "Satélite",
            basemapNight: "Modo Noche",
            markersOverlay: "Marcadores",
            compassError: "Brújula no disponible",
            legendTitle: "Leyenda",
            noTitle: "Título no disponible",
            description: "Descripción",
            domains: "Dominios",
            skills: "Competencias",
            hardware: "Materiales",
            software: "Software",
            members: "Miembros y Colaboradores",
            viewMorePDF: "Ver más (PDF)",
            aboutTitle: "Acerca de este portfolio",
            aboutBody: `<p>Este mapa interactivo presenta mi trayectoria académica y profesional en los campos de la geomática, la topografía y la ingeniería.</p><p>Ha sido desarrollado utilizando <strong>Leaflet.js</strong> para la cartografía, y se alimenta de un archivo <strong>JSON</strong> que contiene todos los datos de las misiones, formaciones y proyectos.</p><p>Navegue haciendo clic en los marcadores para descubrir los detalles de cada experiencia.</p><p>Desarrollado por Manuel Castet.</p>`,
            legalTitle: "Aviso Legal y Propiedad",
            legalBody: `<p>Este sitio es un portfolio personal sin fines comerciales.</p><p>El acceso a este contenido está restringido. La información, los datos y los documentos presentados en este sitio son propiedad intelectual de Manuel Castet y/o de las respectivas entidades mencionadas (escuelas, empresas, misiones).</p><p>Cualquier reproducción, difusión o uso de los contenidos de este sitio (datos, imágenes, código) sin autorización previa explícita está estrictamente prohibida.</p><p>Los mapas base son propiedad de sus respectivos proveedores (OpenStreetMap, Esri, CartoDB, OpenTopoMap) y se utilizan de acuerdo con sus licencias.</p>`,
        }
    };

    let currentLang = 'fr';

    function setLanguage(lang) {
        currentLang = lang;
        const langTranslations = translations[lang];
        document.querySelectorAll('[data-lang-key]').forEach(elem => {
            const key = elem.dataset.langKey;
            if (langTranslations[key]) {
                if (elem.placeholder !== undefined) {
                    elem.placeholder = langTranslations[key];
                } else if (elem.title !== undefined && (elem.id === 'menu-icon' || elem.id === 'details-close-btn' || elem.id === 'menu-close-btn')) {
                    elem.title = langTranslations[key];
                } else if (elem.tagName === 'BUTTON' && elem.id === 'reset-filters-btn') {
                    // Keep icon, replace text
                    const icon = elem.querySelector('i');
                    elem.innerHTML = '';
                    if (icon) elem.appendChild(icon);
                    elem.innerHTML += ` ${langTranslations[key]}`;
                } else {
                    elem.textContent = langTranslations[key];
                }
            }
        });
        // Special cases
        document.getElementById('login-button').textContent = langTranslations.loginButton;
        document.getElementById('error-message').textContent = langTranslations.incorrectPassword;
    }


    // --- 1. VARIABLES GLOBALES ---
    let map;
    let dataStore = []; // Pour stocker les données JSON
    let markersLayerGroup; // Pour gérer les marqueurs (ajout/suppression)
    const allCompetences = new Set();
    const allMateriels = new Set();
    const allSoftwares = new Set();
    
    const DATA_FILES = {
        fr: './merged_data.json',
        en: './merged_data_eng.json',
        es: './merged_data_esp.json'
    };

    const STATUS_MAP = {
        "Etudiant": "etudiant",
        "Bénévole": "benevole",
        "Stagiaire": "stagiaire",
        "Prestation ponctuelle": "prestation",
        "Technicien salarié": "salarie"
    };
    // English statuses
    const STATUS_MAP_EN = {
        "Student": "etudiant",
        "Volunteer": "benevole",
        "Intern": "stagiaire",
        "Short-term contract": "prestation",
        "Salaried technician": "salarie"
    };
    // Spanish statuses
    const STATUS_MAP_ES = {
        "Estudiante": "etudiant",
        "Voluntario": "benevole",
        "Becario": "stagiaire",
        "Servicio puntual": "prestation",
        "Técnico asalariado": "salarie"
    };

    const STATUS_COLORS = {
        "etudiant": "#0b19ddff",
        "benevole": "#28a745",
        "stagiaire": "#fd7e14",
        "prestation": "#6f42c1",
        "salarie": "#dc3545"
    };

    // --- 2. GESTION DE L'AUTHENTIFICATION ---
    const authOverlay = document.getElementById('auth-overlay');
    const appContainer = document.getElementById('app-container');
    const loginForm = document.getElementById('login-form');
    const passwordInput = document.getElementById('password-input');
    const languageSelect = document.getElementById('language-select');
    const errorMessage = document.getElementById('error-message');

    languageSelect.addEventListener('change', (e) => {
        setLanguage(e.target.value);
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
        currentLang = languageSelect.value;
        
        // Mot de passe codé en dur (comme demandé)
        if (passwordInput.value === "ESGTCM25") {
            // Cacher l'overlay
            authOverlay.style.opacity = '0';
            authOverlay.style.pointerEvents = 'none';
            
            // Afficher l'application
            appContainer.style.display = 'block';

            // Attendre la fin de la transition d'opacité
            setTimeout(() => {
                authOverlay.style.display = 'none';
                // Initialiser la carte SEULEMENT après authentification réussie
                initMap();
            }, 500); // 500ms = durée de la transition CSS
            
        } else {
            // Afficher le message d'erreur
            errorMessage.style.display = 'block';
            // Secouer la boîte (effet visuel)
            document.querySelector('.auth-box').classList.add('shake');
            setTimeout(() => {
                document.querySelector('.auth-box').classList.remove('shake');
            }, 300);
        }
    });
    
    // Cache le message d'erreur si l'utilisateur recommence à taper
    passwordInput.addEventListener('input', () => {
        if (errorMessage.style.display === 'block') {
            errorMessage.style.display = 'none';
        }
    });


    // --- 3. INITIALISATION DE LA CARTE (appelée après auth) ---
    function initMap() {
        map = L.map('map').setView([46.603354, 1.888334], 6); // Centre sur la France

        // Définition des fonds de carte (Basemaps)
        const langTrans = translations[currentLang];
        const osmStandard = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        });

        const osmTopo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        });

        const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        });
        
        const osmDark = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        });

        const basemaps = {
            [langTrans.basemapStandard]: osmStandard,
            [langTrans.basemapTopo]: osmTopo,
            [langTrans.basemapSatellite]: satellite,
            [langTrans.basemapNight]: osmDark
        };

        // Ajout du fond de carte par défaut
        osmStandard.addTo(map);

        // Initialisation du groupe de marqueurs (doit être fait AVANT le contrôle des couches)
        markersLayerGroup = L.layerGroup().addTo(map);

        const overlays = {
            [langTrans.markersOverlay]: markersLayerGroup
        };

        // --- 4. AJOUT DES CONTRÔLES LEAFLET ---

        // Sélecteur de couches (Haut-Droite)
        L.control.layers(basemaps, overlays).addTo(map);

        // Échelle (Bas-Gauche)
        L.control.scale({ imperial: false }).addTo(map);

        // Boussole (Haut-Droite)
        L.control.compass({
            position: 'topright',
            autoActive: true,
            showDigit: false,
            textErr: langTrans.compassError
        }).addTo(map);

        // Contrôle personnalisé : Légende (Bas-Gauche)
        const legend = L.control({ position: 'bottomleft' });
        legend.onAdd = function (map) {
            const div = L.DomUtil.create('div', 'leaflet-control-legend');
            div.innerHTML = `<h4>${langTrans.legendTitle}</h4>`;
            
            let currentStatusMap;
            if (currentLang === 'en') {
                currentStatusMap = STATUS_MAP_EN;
            } else if (currentLang === 'es') {
                currentStatusMap = STATUS_MAP_ES;
            } else {
                currentStatusMap = STATUS_MAP;
            }

            for (const [key, value] of Object.entries(currentStatusMap)) {
                const statusClass = value;
                div.innerHTML += `
                    <div class="legend-item" data-status-key="${key}">
                        <span class="legend-color" style="background-color: ${STATUS_COLORS[statusClass]}"></span>
                        ${key}
                    </div>
                `;
            }
            // Empêche le clic sur la légende de zoomer sur la carte
            L.DomEvent.disableClickPropagation(div);
            return div;
        };
        legend.addTo(map);

        // Contrôle personnalisé : Logo (Bas-Droite)
        const logo = L.control({ position: 'bottomright' });
        logo.onAdd = function (map) {
            const div = L.DomUtil.create('div', 'leaflet-control-logo');
            div.innerHTML = '<a href="https://www.esgt.cnam.fr/esgt/" target="_blank" title="ESGT-CNAM"><img src="./images/logo_esgt.png" alt="Logo ESGT"></a>';
            return div;
        };
        logo.addTo(map);

        // Charger les données
        loadData(currentLang);
    }

    // --- 5. CHARGEMENT ET TRAITEMENT DES DONNÉES ---
    async function loadData(lang) {
        const dataPath = DATA_FILES[lang] || DATA_FILES['fr'];
        try {
            const response = await fetch(dataPath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            dataStore = await response.json();
            
            // Une fois les données chargées :
            populateFilters(dataStore);
            renderMarkers(dataStore);
            setupEventListeners(); // Configurer tous les autres écouteurs
            
        } catch (error) {
            console.error("Erreur lors du chargement de merged_data.json:", error);
            alert("Impossible de charger les données du portfolio. Veuillez vérifier la console.");
        }
    }

    // --- 6. GESTION DES MARQUEURS ---

    /**
     * Nettoie le nom du statut pour l'utiliser comme classe CSS.
     * @param {string} statut - Le statut brut (ex: "Prestation ponctuelle")
     * @returns {string} - Le nom de la classe (ex: "statut-prestation")
     */
    function cleanStatutName(statut) {
        let currentStatusMap;
        if (currentLang === 'en') {
            currentStatusMap = STATUS_MAP_EN;
        } else if (currentLang === 'es') {
            currentStatusMap = STATUS_MAP_ES;
        } else {
            currentStatusMap = STATUS_MAP;
        }
        // Find the class name from the translated status
        const statusClass = currentStatusMap[statut];

        return 'statut-' + (statusClass || 'default');
    }

    /**
     * Affiche les marqueurs sur la carte.
     * @param {Array} missionsToShow - La liste des objets mission à afficher.
     */
    function renderMarkers(missionsToShow) {
        // Vider la couche de marqueurs existante
        markersLayerGroup.clearLayers();
        
        if (!missionsToShow || missionsToShow.length === 0) {
            console.log("Aucune mission à afficher.");
            return;
        }

        const bounds = [];

        missionsToShow.forEach(mission => {
            // Vérifier si latlon existe et est valide
            if (mission.latlon && mission.latlon.length === 2) {
                const statutClass = cleanStatutName(mission.statut);
                
                // Créer une icône personnalisée (DivIcon)
                const customIcon = L.divIcon({
                    className: `marker-icon ${statutClass}`,
                    iconSize: [28, 28],
                    iconAnchor: [14, 28], // Pointe basse du marqueur (ajusté pour la rotation)
                    popupAnchor: [0, -28]
                });

                const marker = L.marker(mission.latlon, { icon: customIcon });

                // Ajouter un événement au clic
                marker.on('click', () => {
                    showDetails(mission);
                    // Sur mobile, centrer la carte un peu plus haut pour laisser la place au panneau
                    if (window.innerWidth <= 768) {
                        map.setView([mission.latlon[0] + 0.05, mission.latlon[1]], map.getZoom());
                    } else {
                        map.setView(mission.latlon, map.getZoom());
                    }
                });

                marker.addTo(markersLayerGroup);
                bounds.push(mission.latlon);
            }
        });

        // Centrer la carte sur l'ensemble des marqueurs
        if (bounds.length > 0) {
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }

    // --- 7. GESTION DU PANNEAU DE DÉTAILS ---
    /**
     * Transforme les URL en texte en liens <a> cliquables.
     * Tente d'utiliser le texte précédant l'URL comme libellé.
     * @param {string} text - Le texte brut (ex: "Mon lien : http://...")
     * @returns {string} - Le HTML avec le lien
     */
    function linkify(text) {
        // Regex pour trouver les URL http ou https
        const urlRegex = /(https?:\/\/\S+)/g;
        
        if (!text || !urlRegex.test(text)) {
            return text; // Retourne le texte original s'il n'y a pas d'URL
        }

        // Extrait la première URL trouvée
        const url = text.match(urlRegex)[0];
        
        // Extrait le texte qui n'est PAS l'URL
        let linkText = text.replace(urlRegex, '').trim();
        
        // Nettoie le texte (enlève les ":" finaux, ex: "Source :")
        linkText = linkText.replace(/\s*:\s*$/, '').trim();

        if (linkText === "") {
            // S'il n'y avait que l'URL, utilise l'URL comme texte
            return `<a href="${url}" target="_blank" class="text-link">${url}</a>`;
        } else {
            // Sinon, utilise le texte descriptif
            return `<a href="${url}" target="_blank" class="text-link">${linkText}</a>`;
        }
    }
	
    /**
     * Affiche les détails d'une mission dans le panneau latéral.
     * @param {object} mission - L'objet mission cliqué.
     */
    function showDetails(mission) {
        const detailsContent = document.getElementById('details-content');
        const langTrans = translations[currentLang];
        const statutClass = cleanStatutName(mission.statut);
        
        // 1. Vider le contenu précédent
        detailsContent.innerHTML = '';
        
        // 2. Construire le nouveau HTML
        let html = `
            <span class="statut-badge ${statutClass}">${mission.statut || 'N/A'}</span>
            <h2>${mission.nom || mission.titre || langTrans.noTitle}</h2>
            <p class="meta">
                <span><i class="fa-solid fa-calendar-days"></i> ${mission.dates}</span>
                <span><i class="fa-solid fa-location-dot"></i> ${mission.lieu}</span>
            </p>
        `;

        // 3. Carrousel d'images (s'il y en a)
        if (mission.images_data && mission.images_data.length > 0) {
            html += `
                <div class="carousel-container" id="details-carousel">
                    <div class="carousel-slides">
                        ${mission.images_data.map((img, index) => `
                            <div class="carousel-slide ${index === 0 ? 'active' : ''}" data-index="${index}">
                                <img src="./${img.image_path}" alt="${img.image_caption || 'Image de la mission'}">
                                <div class="carousel-caption">
                                    <span class="caption-text">${img.image_caption || ''}</span>
                                    <span class="caption-source">${img.image_source || ''}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    ${mission.images_data.length > 1 ? `
                    <div class="carousel-nav">
                        <button class="carousel-prev" title="Précédent"><i class="fa fa-chevron-left"></i></button>
                        <button class="carousel-next" title="Suivant"><i class="fa fa-chevron-right"></i></button>
                    </div>
                    ` : ''}
                </div>
            `;
        }
        
        // 4. Description (tableau de paragraphes)
        if (mission.description_mission && mission.description_mission.length > 0) {
            html += `<h3>${langTrans.description}</h3>`;
            html += '<div class="description-content">';
            mission.description_mission.forEach(para => {
                html += `<p>${para}</p>`; // Chaque élément est un paragraphe
            });
            html += '</div>';
        }

        // 5. Listes (Domaines, Compétences, etc.)
        html += createPillListHTML(langTrans.domains, mission.domaines);
        html += createPillListHTML(langTrans.skills, mission.competences);
        html += createPillListHTML(langTrans.hardware, mission.materiels); // 'matériels' dans le JSON
        html += createPillListHTML(langTrans.software, mission.softwares); // 'softwares' dans le JSON

        // 6. Membres
        if (mission.membres) { // 'membres' dans le JSON
            html += `
                <h3>${langTrans.members}</h3>
                <p class="members-list">${mission.membres}</p>
            `;
        }

        // 7. Lien PDF
        if (mission.lien_pdf) {
            html += `
                <a href="${mission.lien_pdf}" target="_blank" class="details-button">
                    <i class="fa-solid fa-file-pdf"></i> ${langTrans.viewMorePDF}
                </a>
            `;
        }

        detailsContent.innerHTML = html;

        // 8. Activer la logique du carrousel (si présent)
        if (mission.images_data && mission.images_data.length > 1) {
            setupCarousel();
        }

        // 9. Afficher le panneau
        document.getElementById('details-panel').classList.add('active');
    }

    /**
     * Helper pour créer une liste de "pilules" (badges).
     * @param {string} title - Titre de la section (ex: "Compétences")
     * @param {Array} list - Tableau de strings
     * @returns {string} - Le HTML généré
     */
    function createPillListHTML(title, list) {
        if (!list || list.length === 0) return '';
        
        let html = `<h3>${title}</h3>`;
        html += '<ul class="pill-list">';
        list.forEach(item => {
            if(item) { // Éviter les items null/undefined
                 html += `<li>${item}</li>`;
            }
        });
        html += '</ul>';
        return html;
    }

    // --- 8. LOGIQUE DU CARROUSEL ---
    function setupCarousel() {
        const carousel = document.getElementById('details-carousel');
        if (!carousel) return;

        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        let currentIndex = 0;

        function updateCarousel() {
            slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === currentIndex);
            });
            prevBtn.disabled = (currentIndex === 0);
            nextBtn.disabled = (currentIndex === slides.length - 1);
        }

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });

        nextBtn.addEventListener('click', () => {
            if (currentIndex < slides.length - 1) {
                currentIndex++;
                updateCarousel();
            }
        });

        updateCarousel(); // Initialiser l'état des boutons
    }
    
    /**
     * Catégorise un outil (matériel ou logiciel) pour simplifier les filtres.
     * @param {string} toolName - Le nom de l'outil depuis le JSON.
     * @returns {string} - La catégorie de l'outil.
     */
    function getToolCategory(toolName) {
        const lowerToolName = toolName.toLowerCase();

        // Catégories de matériels
        if (lowerToolName.includes('station')) return 'Station Totale';
        if (lowerToolName.includes('scanner')) return 'Scanner 3D';
        if (lowerToolName.includes('gnss') || lowerToolName.includes('septentrio')) return 'Récepteur GNSS';
        if (lowerToolName.includes('drone')) return 'Drone';
        if (lowerToolName.includes('caméra') || lowerToolName.includes('gopro') || lowerToolName.includes('appareil photo')) return 'Appareil photo / Caméra';
        if (lowerToolName.includes('géoradar')) return 'Géoradar';
        if (lowerToolName.includes('vivax')) return 'Détecteur de réseaux';

        // Pour les logiciels, on peut aussi standardiser les noms si besoin
        if (lowerToolName.includes('qgis')) return 'QGIS';
        if (lowerToolName.includes('autocad')) return 'AutoCAD';
        if (lowerToolName.includes('covadis')) return 'Covadis';
        if (lowerToolName.includes('metashape')) return 'Agisoft Metashape';
        if (lowerToolName.includes('cyclone')) return 'Leica Cyclone';
        if (lowerToolName.includes('realworks')) return 'Trimble Realworks';
        if (lowerToolName.includes('cloudcompare')) return 'CloudCompare';
        if (lowerToolName.includes('géofoncier')) return 'Géofoncier';

        // Si aucune catégorie ne correspond, on retourne le nom original (utile pour les logiciels uniques)
        return toolName;
    }


    // --- 9. GESTION DES FILTRES ---

    /**
     * Remplit les options de filtres dans le menu à partir des données.
     */
    function populateFilters(data) {
        const statutContainer = document.getElementById('statut-filter-container');
        const competencesList = document.getElementById('competences-list');
        const materielsList = document.getElementById('materiels-list');
        const logicielsList = document.getElementById('logiciels-list');
        
        let currentStatusMap;
        if (currentLang === 'en') {
            currentStatusMap = STATUS_MAP_EN;
        } else if (currentLang === 'es') {
            currentStatusMap = STATUS_MAP_ES;
        } else {
            currentStatusMap = STATUS_MAP;
        }

        // 1. Filtres de Statut (basés sur la map statique)
        statutContainer.innerHTML = '';
        for (const [key, value] of Object.entries(currentStatusMap)) {
            const statusClass = value;
            statutContainer.innerHTML += `
                <label class="statut-filter-label" data-statut="${statusClass}">
                    <input type="checkbox" class="statut-filter" value="${key}">
                    <span class="color-dot" style="background-color: ${STATUS_COLORS[statusClass]}"></span>
                    ${key}
                </label>
            `;
        }

        // 2. Collecter Compétences et Outils/Logiciels
        data.forEach(mission => {
            mission.competences?.forEach(c => allCompetences.add(c));
            // Catégoriser et ajouter les matériels
            mission.materiels?.forEach(materiel => {
                const category = getToolCategory(materiel);
                allMateriels.add(category);
            });
            // Catégoriser et ajouter les logiciels
            mission.softwares?.forEach(software => {
                allSoftwares.add(software); // Les logiciels ne sont pas catégorisés pour le moment
            });
        });

        // 3. Afficher Compétences
        competencesList.innerHTML = '';
        [...allCompetences].sort().forEach(c => {
            competencesList.innerHTML += `<span class="filter-badge" data-filter-type="competence" data-value="${c}">${c}</span>`;
        });
        
        // 4. Afficher Matériels
        materielsList.innerHTML = '';
        [...allMateriels].sort().forEach(m => {
            materielsList.innerHTML += `<span class="filter-badge" data-filter-type="materiel" data-value="${m}">${m}</span>`;
        });

        // 5. Afficher Logiciels
        logicielsList.innerHTML = '';
        [...allSoftwares].sort().forEach(s => {
            logicielsList.innerHTML += `<span class="filter-badge" data-filter-type="logiciel" data-value="${s}">${s}</span>`;
        });
    }
    
    /**
     * Applique les filtres sélectionnés et met à jour les marqueurs.
     */
    function applyFilters() {
        // 1. Obtenir les statuts sélectionnés
        const selectedStatuts = [...document.querySelectorAll('.statut-filter:checked')].map(cb => cb.value);

        // 2. Obtenir les compétences sélectionnées
        const selectedCompetences = [...document.querySelectorAll('.filter-badge[data-filter-type="competence"].active')].map(badge => badge.dataset.value);

        // 3. Obtenir les matériels sélectionnés
        const selectedMateriels = [...document.querySelectorAll('.filter-badge[data-filter-type="materiel"].active')].map(badge => badge.dataset.value);

        // 4. Obtenir les logiciels sélectionnés
        const selectedLogiciels = [...document.querySelectorAll('.filter-badge[data-filter-type="logiciel"].active')].map(badge => badge.dataset.value);

        // 4. Filtrer dataStore
        const filteredMissions = dataStore.filter(mission => {
            // Logique de filtrage
            const statutMatch = selectedStatuts.length === 0 || selectedStatuts.includes(mission.statut);
            
            const competenceMatch = selectedCompetences.length === 0 || selectedCompetences.every(selComp => 
                mission.competences?.includes(selComp)
            );
            
            // Correspondance des matériels (avec catégorisation)
            const missionMaterielCategories = new Set((mission.materiels || []).map(getToolCategory));
            const materielMatch = selectedMateriels.length === 0 || selectedMateriels.every(selMat =>
                missionMaterielCategories.has(selMat)
            );

            // Correspondance des logiciels (directe)
            const logicielMatch = selectedLogiciels.length === 0 || selectedLogiciels.every(selLog =>
                mission.softwares?.includes(selLog)
            );

            return statutMatch && competenceMatch && materielMatch && logicielMatch;
        });

        // 5. Rendre à nouveau les marqueurs
        renderMarkers(filteredMissions);

    }
    
    // --- 10. GESTION DES ÉVÉNEMENTS (MENU, MODALES, FILTRES) ---
    function setupEventListeners() {
        const menuIcon = document.getElementById('menu-icon');
        const menuPanel = document.getElementById('menu-panel');
        const menuCloseBtn = document.getElementById('menu-close-btn');
        const detailsPanel = document.getElementById('details-panel');
        const detailsCloseBtn = document.getElementById('details-close-btn');

        // Ouvrir/Fermer Menu
        menuIcon.addEventListener('click', () => menuPanel.classList.add('active'));
        menuCloseBtn.addEventListener('click', () => menuPanel.classList.remove('active'));

        // Fermer Panneau de détails
        detailsCloseBtn.addEventListener('click', () => detailsPanel.classList.remove('active'));

        // --- Ajout de la gestion du swipe pour fermer le panneau de détails sur mobile ---
        let touchStartY = 0;
        let touchMoveY = 0;

        detailsPanel.addEventListener('touchstart', (e) => {
            // On ne commence le suivi que si le doigt est sur l'en-tête ou la poignée pour ne pas bloquer le scroll du contenu
            if (e.target.closest('#details-close-btn') || e.target.closest('.panel-header')) {
                 touchStartY = e.touches[0].clientY;
            } else {
                touchStartY = 0; // Reset si on touche le contenu scrollable
            }
        }, { passive: true });

        detailsPanel.addEventListener('touchmove', (e) => {
            if (touchStartY === 0) return;
            touchMoveY = e.touches[0].clientY;
        }, { passive: true });

        detailsPanel.addEventListener('touchend', (e) => {
            if (touchStartY === 0) return;
            const swipeDistance = touchMoveY - touchStartY;
            // Si on a glissé vers le bas de plus de 50px
            if (swipeDistance > 50) {
                detailsPanel.classList.remove('active');
            }
            // Reset des positions
            touchStartY = 0;
            touchMoveY = 0;
        });

        // --- Gestion des accordéons dans les filtres ---
        document.querySelectorAll('.accordion-header').forEach(header => {
            header.addEventListener('click', () => {
                const content = header.nextElementSibling;
                // Ferme les autres accordéons
                document.querySelectorAll('.accordion-content.open').forEach(openContent => {
                    if (openContent !== content) openContent.classList.remove('open');
                });
                // Ouvre ou ferme l'accordéon cliqué
                content.classList.toggle('open');
            });
        });

        // Clic en dehors des panneaux pour les fermer
        map.on('click', () => {
            menuPanel.classList.remove('active');
            detailsPanel.classList.remove('active');
        });

        // --- Écouteurs pour les Filtres ---
        
        // Filtres Statut (changement sur le conteneur)
        document.getElementById('statut-filter-container').addEventListener('change', applyFilters);

        // Filtres Badges (Compétences & Outils)
        document.getElementById('competences-list').addEventListener('click', toggleBadgeFilter);
        document.getElementById('materiels-list').addEventListener('click', toggleBadgeFilter);
        document.getElementById('logiciels-list').addEventListener('click', toggleBadgeFilter);
        
        function toggleBadgeFilter(e) {
            if (e.target.classList.contains('filter-badge')) {
                e.target.classList.toggle('active');
                applyFilters();
            }
        }
        
        // Recherche dans les filtres
        document.getElementById('competence-search').addEventListener('input', (e) => filterBadgeList(e.target.value, 'competences-list'));
        document.getElementById('materiel-search').addEventListener('input', (e) => filterBadgeList(e.target.value, 'materiels-list'));
        document.getElementById('logiciel-search').addEventListener('input', (e) => filterBadgeList(e.target.value, 'logiciels-list'));
        
        function filterBadgeList(term, listId) {
            const listContainer = document.getElementById(listId);
            const badges = listContainer.querySelectorAll('.filter-badge');
            const lowerTerm = term.toLowerCase();
            
            badges.forEach(badge => {
                const text = badge.textContent.toLowerCase();
                badge.style.display = text.includes(lowerTerm) ? 'inline-block' : 'none';
            });
        }
        
        // Bouton Réinitialiser les filtres
        document.getElementById('reset-filters-btn').addEventListener('click', () => {
            // Décocher statuts
            document.querySelectorAll('.statut-filter:checked').forEach(cb => cb.checked = false);
            // Désactiver badges
            document.querySelectorAll('.filter-badge.active').forEach(badge => badge.classList.remove('active'));
            // Vider recherche
            document.getElementById('competence-search').value = '';
            document.getElementById('materiel-search').value = '';
            document.getElementById('logiciel-search').value = '';
            // Afficher tous les badges
            filterBadgeList('', 'competences-list');
            filterBadgeList('', 'materiels-list');
            filterBadgeList('', 'logiciels-list');
            
            // Appliquer (ce qui va tout réafficher)
            applyFilters();
        });

        // --- Écouteurs pour les Modales (À Propos / Légal) ---
        const modalOverlay = document.getElementById('modal-overlay');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');
        const modalCloseBtn = document.getElementById('modal-close-btn');

        document.getElementById('about-btn').addEventListener('click', () => {
            const langTrans = translations[currentLang];
            modalTitle.textContent = langTrans.aboutTitle;
            modalBody.innerHTML = langTrans.aboutBody;
            modalOverlay.classList.add('active');
        });

        document.getElementById('legal-btn').addEventListener('click', () => {
            const langTrans = translations[currentLang];
            modalTitle.textContent = langTrans.legalTitle;
            modalBody.innerHTML = langTrans.legalBody;
            modalOverlay.classList.add('active');
        });

        // Fermer la modale
        modalCloseBtn.addEventListener('click', () => modalOverlay.classList.remove('active'));
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) { // Ferme seulement si on clique sur le fond
                modalOverlay.classList.remove('active');
            }
        });
    }

    // Initialiser la langue au chargement de la page
    setLanguage(languageSelect.value);
});
