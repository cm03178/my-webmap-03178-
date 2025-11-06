// Attendre que le DOM soit entièrement chargé
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. VARIABLES GLOBALES ---
    let map;
    let dataStore = []; // Pour stocker les données JSON
    let markersLayerGroup; // Pour gérer les marqueurs (ajout/suppression)
    const allCompetences = new Set();
    const allMateriels = new Set();
    const allSoftwares = new Set();
    
    const STATUS_MAP = {
        "Etudiant": "etudiant",
        "Bénévole": "benevole",
        "Stagiaire": "stagiaire",
        "Prestation ponctuelle": "prestation",
        "Technicien salarié": "salarie"
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
    const errorMessage = document.getElementById('error-message');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
        
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
            "Standard": osmStandard,
            "Topographique": osmTopo,
            "Satellite": satellite,
            "Mode Nuit": osmDark
        };

        // Ajout du fond de carte par défaut
        osmStandard.addTo(map);

        // Initialisation du groupe de marqueurs (doit être fait AVANT le contrôle des couches)
        markersLayerGroup = L.layerGroup().addTo(map);

        const overlays = {
            "Marqueurs": markersLayerGroup
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
            textErr: 'Boussole non disponible'
        }).addTo(map);

        // Contrôle personnalisé : Légende (Bas-Gauche)
        const legend = L.control({ position: 'bottomleft' });
        legend.onAdd = function (map) {
            const div = L.DomUtil.create('div', 'leaflet-control-legend');
            div.innerHTML = '<h4>Légende</h4>';
            for (const [key, value] of Object.entries(STATUS_MAP)) {
                div.innerHTML += `
                    <div class="legend-item">
                        <span class="legend-color" style="background-color: ${STATUS_COLORS[value]}"></span>
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
        loadData();
    }

    // --- 5. CHARGEMENT ET TRAITEMENT DES DONNÉES ---
    async function loadData() {
        try {
            const response = await fetch('./merged_data.json');
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
        return 'statut-' + (STATUS_MAP[statut] || 'default');
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
        const statutClass = cleanStatutName(mission.statut);
        
        // 1. Vider le contenu précédent
        detailsContent.innerHTML = '';
        
        // 2. Construire le nouveau HTML
        let html = `
            <span class="statut-badge ${statutClass}">${mission.statut || 'N/A'}</span>
            <h2>${mission.nom || mission.titre || 'Titre non disponible'}</h2>
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
            html += '<h3>Description</h3>';
            html += '<div class="description-content">';
            mission.description_mission.forEach(para => {
                html += `<p>${para}</p>`; // Chaque élément est un paragraphe
            });
            html += '</div>';
        }

        // 5. Listes (Domaines, Compétences, etc.)
        html += createPillListHTML('Domaines', mission.domaines);
        html += createPillListHTML('Compétences', mission.competences);
        html += createPillListHTML('Matériels', mission.materiels); // 'matériels' dans le JSON
        html += createPillListHTML('Logiciels', mission.softwares); // 'softwares' dans le JSON

        // 6. Membres
        if (mission.membres) { // 'membres' dans le JSON
            html += `
                <h3>Membres & Collaborateurs</h3>
                <p class="members-list">${mission.membres}</p>
            `;
        }

        // 7. Lien PDF
        if (mission.lien_pdf) {
            html += `
                <a href="${mission.lien_pdf}" target="_blank" class="details-button">
                    <i class="fa-solid fa-file-pdf"></i> Voir plus (PDF)
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
        
        // 1. Filtres de Statut (basés sur la map statique)
        statutContainer.innerHTML = '';
        for (const [key, value] of Object.entries(STATUS_MAP)) {
            statutContainer.innerHTML += `
                <label class="statut-filter-label" data-statut="${value}">
                    <input type="checkbox" class="statut-filter" value="${key}">
                    <span class="color-dot" style="background-color: ${STATUS_COLORS[value]}"></span>
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
            modalTitle.textContent = "À propos de ce portfolio";
            modalBody.innerHTML = `
                <p>Cette carte interactive présente mon parcours académique et professionnel dans les domaines de la géomatique, de la topographie et de l'ingénierie.</p>
                <p>Elle a été développée en utilisant <strong>Leaflet.js</strong> pour la cartographie, et est alimentée par un fichier <strong>JSON</strong> contenant toutes les données des missions, formations et projets.</p>
                <p>Naviguez en cliquant sur les marqueurs pour découvrir les détails de chaque expérience.</p>
                <p>Développé par Manuel Castet.</p>
            `;
            modalOverlay.classList.add('active');
        });

        document.getElementById('legal-btn').addEventListener('click', () => {
            modalTitle.textContent = "Mentions Légales & Propriété";
            modalBody.innerHTML = `
                <p>Ce site est un portfolio personnel à but non-commercial.</p>
                <p>L'accès à ce contenu est restreint. Les informations, données et documents présentés sur ce site sont la propriété intellectuelle de Manuel Castet et/ou des entités respectives mentionnées (écoles, entreprises, missions).</p>
                <p>Toute reproduction, diffusion ou utilisation des contenus de ce site (données, images, code) sans autorisation préalable explicite est strictement interdite.</p>
                <p>Les fonds de carte sont la propriété de leurs fournisseurs respectifs (OpenStreetMap, Esri, CartoDB, OpenTopoMap) et sont utilisés conformément à leurs licences.</p>
            `;
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
});
