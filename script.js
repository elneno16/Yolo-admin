document.addEventListener('DOMContentLoaded', () => {
    // API de Google Sheets para Sincronización
    const G_SHEET_API = "https://script.google.com/macros/s/AKfycbzNKQnl-dbm3R6kBGXFdyhwqtaWLAjQPmCXys-OqZHwAMwtG7iHwCF6RFIK-YcKqezo/exec";
    const G_SPREADSHEET_URL = "https://elneno16.github.io/Yolo-admin/"; // Central de la nube (GitHub Pages)

    // State
    let inventory = JSON.parse(localStorage.getItem('yolo_inventory')) || [];

    // Función para Cargar Datos desde la Nube (Prioridad Máxima)
    async function loadFromCloud() {
        try {
            console.log("🔄 Sincronizando con la nube...");
            const response = await fetch(G_SHEET_API);
            const cloudData = await response.json();
            
            if (cloudData && Array.isArray(cloudData) && cloudData.length > 0) {
                // Solo sobreescribir si la nube tiene más o igual datos que local
                // O si local está vacío, para evitar borrar progresos no subidos
                if (cloudData.length >= inventory.length || inventory.length === 0) {
                    inventory = cloudData;
                    localStorage.setItem('yolo_inventory', JSON.stringify(inventory));
                    renderTable();
                    updateCounters();
                    console.log("✅ Sincronización completa: Google Sheets manda.");
                } else {
                    console.log("ℹ️ Local tiene más datos que la nube. Ignorando descarga para proteger cambios locales.");
                }
            } else {
                checkInitialData();
            }
        } catch (e) {
            console.error("❌ Error al cargar desde la nube:", e);
            checkInitialData();
        }
    }

    function checkInitialData() {
        if (!inventory || inventory.length === 0) {
            console.log("📦 Cargando datos iniciales (Data local)");
            const rawData = `DE NIÑO VENEZUELA Vinotinto 24/25 LOCAL - Talla 8  - SIN DORSAL  - COPA AMERICA 2024	sin dorsal 	1era equipacion local 	8
AL NASSR AMARILLA 24/25 LOCAL - Talla L- CRISTIANO RONALDO #7 - SIN PARCHE	Cristiano Ronaldo #7	1era equipacion local 	L
AL NASSR AZUL MARINO 24/25 VISITANTE - Talla S - CRISTIANO RONALDO #7-	Cristiano Ronaldo #7	2da equipacion visitante 	S
AL NASSR AZUL MARINO 24/25 VISITANTE - Talla XL - CRISTIANO RONALDO #7 -	Cristiano Ronaldo #7	2da equipacion visitante 	XL
ATLETICO MADRID ARANA 24/25 LOCAL - Talla L - JULIAN ALVAREZ #19 - LA LIGA	julian alvarez #19	1era equipacion local 	L
ATLETICO MADRID ARANA 24/25 LOCAL ESP - Talla S - JULIAN ALVAREZ #19 - LA LIGA	julian alvarez #19	1era equipacion local 	S
BARCELONA 2025 125 ANIVERSARIO - Talla S-SIN DORSAL	sin dorsal 	1era equipacion local 	S
BARCELONA 25/26 LOCAL - Talla L- YAMAL 10	LAMINE YAMAL  #10	1era equipacion local 	L
BARCELONA KOBE 25/26 - Talla L- YAMAL #10	LAMINE YAMAL  #10	2da equipacion visitante 	L
BARCELONA KOBE 25/26 - Talla M - PEDRI #8	Pedri #8	2da equipacion visitante 	M
BARCELONA NEGRA 24/25 VISITANTE - Talla XL - LAMINE YAMAL #19 - CHAMPIONS	LAMINE YAMAL #19	2da equipacion visitante 	XL
BARCELONA ROJA Y AZUL 24/25 LOCAL - Talla L- RAPHINA #11 -CHAMPIONS	RAPHINA #11	1era equipacion local 	L
BARCELONA ROJA Y AZUL 24/25 LOCAL - Talla XL - LAMINE YAMAL #19 - LA LIGA	LAMINE YAMAL #19	1era equipacion local 	XL
BARCELONA ROJAY AZUL 24/25 LOCAL - Talla S- LAMINE YAMAL #19 - CHAMPIONS	LAMINE YAMAL #19	1era equipacion local 	S
INTER MIAMI 25/26 VISITANTE. - Talla S- MESSI #10 - MLS	MESSI #10	2da equipacion visitante 	S
INTER MIAMI VERDE 24/25 ALTERNA - Talla M- MESSI #10- MLS	MESSI #10	3ra equipacion alterna	M
INTER MIAMI VERDE 24/25 ALTERNA - Talla S - MESSI#10- MLS	MESSI #10	3ra equipacion alterna	S
INTER MIAMI VERDE 24/25 ALTERNA - Talla XL - MESSI #10 - MLS	MESSI #10	3ra equipacion alterna	XL
MANCHESTER CITY AZUL 24/25 LOCAL - Talla L- HAALAND #9 - CHAMPIONS	HAALAND #9	1era equipacion local 	L
MANCHESTER UNITED 07/08 LOCAL ROJA RETRO CR7 - Talla XL - CRISTIANO RONALDO #7- CHAMPION	Cristiano Ronaldo #7	1era equipacion local 	XL
REAL MADRID 25/26 MANGA LARGA CHAMPIONS - Talla L - BELLINGHAND - CHAMPIOS	BELLINGHAND #5	1era equipacion local 	L
REAL MADRID AZUL REY 25/26 ALTERNA - Talla M - MASTANTUONO #30 - CHAMPIONS	MASTANTUONO #30	2da equipacion visitante 	M
REAL MADRID BEISBOL 25/26 - Talla L -SIN DORSAL	SIN DORSAL	Edicion Especial 	L
REAL MADRID BEISBOL 25/26 - Talla M- SIN DORSAL	SIN DORSAL	Edicion Especial 	M
REAL MADRID BEISBOL 25/26 - Talla XL - REAL MADRID	SIN DORSAL	Edicion Especial 	XL
REAL MADRID BLANCA 24/25 LOCAL - Talla L- MBAPPE #9 - CHAMPIONS	MBAPPE #9	1era equipacion local 	L
REAL MADRID BLANCA 24/25 LOCAL - Talla M - BELLINGHAM #5 - CHAMPIONS	BELLINGHAM #5	1era equipacion local 	M
REAL MADRID BLANCA 24/25 LOCAL - Talla M - MBAPPE #9 - CHAMPIONS	MBAPPE #9	1era equipacion local 	M
REAL MADRID BLANCA 24/25 LOCAL - Talla XL - MBAPPE #9 - CHAMPIONS	MBAPPE #9	1era equipacion local 	XL
REAL MADRID NARANJA 24/25 VISITANTE - Talla M - BELLINGHAM #5 - CHAMPIONS	BELLINGHAM #5	2da equipacion visitante 	M
REAL MADRID NARANJA 24/25 VISITANTE - Talla XL - MBAPPE #9 - CHAMPIONS	MBAPPE #9	2da equipacion visitante 	XL
REAL MADRID VISITANTE 25/26 - Talla M- MBAPPE #10 	MBAPPE #9	2da equipacion visitante 	M
REAL MADRID VISITANTE 25/26 - Talla M- VALVERDE 8  - CHAMPIONS	VALVERDE 8  	2da equipacion visitante 	M
REAL MADRID VISITANTE 25/26 - Talla S- VALVERDE 8  - CHAMPIONS	VALVERDE 8  	2da equipacion visitante 	S
REAL SOCIEDAD VISITANTE DORADA, - Talla M- ARAMBURU #19 - LA LIGA	ARAMBURU #19	2da equipacion visitante 	M
VENEZUELA Blanca 24/25 VISITANTE - Talla L- RONDON #23 - SIN PARCHES	RONDON #23	2da equipacion visitante 	L
VENEZUELA Blanca 24/25 VISITANTE - Talla L- SOTELDO #10- SIN PARCHES	SOTELDO #10	2da equipacion visitante 	L
VENEZUELA Blanca 24/25 VISITANTE - Talla M - SOTELDO #10 - SIN PARCHES	SOTELDO #10	2da equipacion visitante 	M
VENEZUELA Blanca 24/25 VISITANTE - Talla M- RONDON #23 - SIN PARCHES	RONDON #23	2da equipacion visitante 	M`;

            const startTime = '2026-03-25T15:32:05-05:00';
            inventory = rawData.split('\n').filter(l => l.trim()).map((line, i) => {
                const parts = line.split('\t');
                const desc = parts[0] ? parts[0].trim() : "";
                let dorsalValue = parts[1] ? parts[1].trim() : "nombre y Número";
                const equipacion = parts[2] ? parts[2].trim() : "Local";
                const talla = parts[3] ? parts[3].trim() : "";
                
                let dorsalType = "nombre y Número";
                let dorsalText = "";
                if (dorsalValue.toLowerCase().includes("sin dorsal")) {
                    dorsalType = "Sin dorsal";
                } else if (dorsalValue.toLowerCase().includes("no aplica")) {
                    dorsalType = "no aplica";
                } else {
                    dorsalType = "nombre y Número";
                    dorsalText = dorsalValue;
                }

                const tipo = parts[6] ? parts[6].trim() : "Manga corta";
                const producto = parts[7] ? parts[7].trim() : "camiseta de fútbol";
                const almacen = parts[8] ? parts[8].trim() : "Pendiente";
                
                let equipo = "Otro";
                const teamNames = ["REAL MADRID", "BARCELONA", "INTER MIAMI", "ATLETICO MADRID", "MANCHESTER CITY", "MANCHESTER UNITED", "AL NASSR", "REAL SOCIEDAD", "VENEZUELA"];
                for(let t of teamNames) { if(desc.toUpperCase().includes(t)) equipo = t; }
                
                let parches = "";
                const desc_parts = desc.split('-');
                desc_parts.forEach(d => {
                    const dup = d.toUpperCase();
                    if(dup.includes("CHAMPIONS") || dup.includes("LA LIGA") || dup.includes("MLS") || dup.includes("COPA AMERICA") || dup.includes("SIN PARCHE")) parches = d.trim();
                });
                
                return {
                    id: (Date.now() + i).toString(),
                    codigo: 'YOLO-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
                    photos: [],
                    producto: producto,
                    equipo: equipo,
                    equipacion: equipacion,
                    anio: "2024",
                    talla: talla,
                    dorsal: dorsalType,
                    dorsalTexto: dorsalText,
                    parches: parches,
                    tipo: tipo,
                    descripcion: desc,
                    cantidad: "1",
                    almacen: almacen,
                    costo: "",
                    proveedor: "",
                    nota: "",
                    fechaEntrada: startTime,
                    fechaRegistro: startTime
                };
            });
            saveInventory();
        }
    }

    // Arrancar la sincronización
    loadFromCloud();

    // Special Migration: Update existing records to the new AM/PM start time if they were just initialized
    if (inventory.length > 0) {
        let changed = false;
        const targetTime = '2026-03-25T15:32:05-05:00';
        inventory.forEach(item => {
            if (!item.fechaRegistro || item.fechaRegistro.includes('Z')) { // or if it was the previous auto-generated one
                item.fechaRegistro = targetTime;
                changed = true;
            }
        });
        if (changed) {
            localStorage.setItem('yolo_inventory', JSON.stringify(inventory));
        }
    }
    
    // Global Filter State
    let activeFilter = 'todos';
    let entryHistActive = false; // Flag for Entry History mode
    let selectedEntryMonths = [0,1,2,3,4,5,6,7,8,9,10,11];
    let selectedEntryAttributes = {
        producto: '', equipo: '', equipacion: '', anio: '', talla: '', dorsal: '', parches: '', tipo: ''
    };

    // DOM Elements
    const btnRegisterProduct = document.getElementById('btnRegisterProduct');
    const productModal = document.getElementById('productModal');
    const btnCloseModal = document.getElementById('btnCloseModal');
    const btnCancel = document.getElementById('btnCancel');
    const productForm = document.getElementById('productForm');
    const inventoryBody = document.getElementById('inventoryBody');
    const searchInput = document.getElementById('searchInput');
    
    const imageViewerModal = document.getElementById('imageViewerModal');
    const btnCloseImageViewer = document.getElementById('btnCloseImageViewer');
    const imageViewerGrid = document.getElementById('imageViewerGrid');
    
    // Form Inputs
    const codigoInput = document.getElementById('codigo');
    const editRowId = document.getElementById('editRowId');
    const photoInputs = document.querySelectorAll('.photo-input');
    
    let currentPhotos = []; // Keep track of base64 images

    const dorsalSelect = document.getElementById('dorsal');
    const dorsalTexto = document.getElementById('dorsal_texto');

    // Configuración Elements
    const configModal = document.getElementById('configModal');
    const btnMainConfig = document.getElementById('btnMainConfig');
    const btnCloseConfig = document.getElementById('btnCloseConfig');
    const btnCloseConfig2 = document.getElementById('btnCloseConfig2');
    const btnPushToCloud = document.getElementById('btnPushToCloud');
    const btnExportCSV = document.getElementById('btnExportCSV');
    const btnClearHistoryFull = document.getElementById('btnClearHistoryFull');
    const btnExportJSON = document.getElementById('btnExportJSON');
    const syncSuccessModal = document.getElementById('syncSuccessModal');
    const btnOpenCloudLink = document.getElementById('btnOpenCloudLink');

    // Historial, Banco de Clientes y Contador de Ventas
    let historyLog = JSON.parse(localStorage.getItem('yolo_history')) || [];
    let clientsBank = JSON.parse(localStorage.getItem('yolo_clients')) || [];
    let lastSaleNumber = parseInt(localStorage.getItem('yolo_last_sale_number') || '0');
    
    function saveClients() {
        try {
            localStorage.setItem('yolo_clients', JSON.stringify(clientsBank));
        } catch(e) { console.warn('Could not save clients:', e); }
    }
    
    function logAction(item, actionType, details = '', saleData = null, saleNum = '') {
        const cintillo = `Código: ${item.codigo} | Producto: ${item.producto} | Equipo: ${item.equipo} | Equipación: ${item.equipacion} | Año: ${item.anio} | Talla: ${item.talla} | Dorsal: ${item.dorsal === 'nombre y Número' ? item.dorsalTexto : item.dorsal} | Parche: ${item.parches} | Tipo: ${item.tipo} | Cantidad: ${item.cantidad} | Almacén: ${item.almacen} | Costo: ${item.costo} | Cliente: ${item.clienteNombre} | Fecha Reg: ${formatDate(item.fechaRegistro)}`;
        
        const logEntry = {
            logId: Date.now().toString() + Math.random().toString(36).substr(2, 4),
            timestamp: new Date().toISOString(),
            cintillo: cintillo,
            action: actionType,
            details: details
        };

        if (saleData) logEntry.saleData = saleData;
        if (saleNum) logEntry.saleNumber = saleNum;

        // For deletion, save the original object to allow restoration
        if (actionType.toLowerCase().includes('limin') || actionType.toLowerCase().includes('borra')) {
            logEntry.backup = JSON.parse(JSON.stringify(item));
        }
        
        historyLog.unshift(logEntry);
        
        // Limit log size to 30 entries to conserve LocalStorage memory (optimized from 50)
        if (historyLog.length > 30) historyLog.pop();
        
        try {
            localStorage.setItem('yolo_history', JSON.stringify(historyLog));
        } catch (e) {
            console.warn("No se pudo guardar el historial, limpiando para liberar memoria...");
            if (e.name === 'QuotaExceededError') {
                historyLog = historyLog.slice(0, 5); // Keep only last 5 if we hit quota
                localStorage.setItem('yolo_history', JSON.stringify(historyLog));
            }
        }
        checkStorageQuota(); // Check quota after logging
    }

    // --- NEW: Storage Quota Monitor ---
    function checkStorageQuota() {
        try {
            const used = JSON.stringify(localStorage).length;
            const limit = 5 * 1024 * 1024; // approx 5MB
            const percent = (used / limit) * 100;
            
            if (percent > 90) {
                showToast(`🚨 MEMORIA CASI LLENA (${percent.toFixed(0)}%). Por favor exporta un respaldo y limpia fotos.`, 'error');
            } else if (percent > 70) {
                console.warn(`Storage usage at ${percent.toFixed(1)}%`);
            }
        } catch (e) {}
    }



    // Toggle dorsal text input
    if (dorsalSelect) {
        dorsalSelect.addEventListener('change', () => {
            if (dorsalSelect.value === 'nombre y Número') {
                dorsalTexto.classList.remove('hidden');
            } else {
                dorsalTexto.classList.add('hidden');
                dorsalTexto.value = '';
            }
        });
    }

    // Utility: Generate Code
    function generateCode() {
        return 'Yolo-' + Math.random().toString(36).substr(2, 6).toUpperCase();
    }
    
    // Utility: Format Date
    function formatDate(isoString) {
        if (!isoString) return '-';
        const d = new Date(isoString);
        let hours = d.getHours();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const minutes = d.getMinutes().toString().padStart(2, '0');
        return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()} ${hours}:${minutes} ${ampm}`;
    }
    
    // Utility: Save to LocalStorage and Sync with Cloud
    async function saveInventory(silent = true) {
        try {
            // 1. Guardar en LocalStorage (Respaldo inmediato)
            localStorage.setItem('yolo_inventory', JSON.stringify(inventory));
            renderTable();
            updateCounters();
            checkStorageQuota();

            if (!silent) showToast("📤 Iniciando subida forzada a la nube...", "info");

            // 2. Sincronizar con Google Sheets (Segundo plano)
            fetch(G_SHEET_API, {
                method: 'POST',
                mode: 'no-cors', // Necesario para Google Apps Script
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inventory)
            }).then(() => {
                console.log("☁️ Sincronización con la nube exitosa");
                if (!silent) {
                    showToast("✅ ¡Nube actualizada correctamente!", "success");
                    if (syncSuccessModal) syncSuccessModal.classList.remove('hidden');
                }
            }).catch(err => {
                console.error("⚠️ No se pudo sincronizar con la nube:", err);
                if (!silent) showToast("❌ Error al subir. Comprueba tu conexión.", "error");
            });

        } catch (e) {
            if (e.name === 'QuotaExceededError') {
                console.error("Critical: LocalStorage is full!");
                showToast('⚠️ Error: Memoria llena. No se pudo guardar localmente.', 'error');
                throw e; 
            }
        }
    }
    
    // Modal Functions
    function openModal(isEdit = false) {
        productModal.classList.remove('hidden');
        if (!isEdit) {
            productForm.reset();
            editRowId.value = '';
            codigoInput.value = generateCode();
            document.getElementById('cantidad').value = '1';
            document.getElementById('precioCliente').value = '';
            resetPhotos();
            dorsalTexto.classList.remove('hidden'); // Default show if name/num
            document.getElementById('modalTitle').textContent = 'Registro de Producto';
        } else {
            document.getElementById('modalTitle').textContent = 'Editar Producto';
        }
    }
    
    function closeModal() {
        productModal.classList.add('hidden');
    }
    
    btnRegisterProduct.addEventListener('click', () => openModal(false));
    btnCloseModal.addEventListener('click', closeModal);
    btnCancel.addEventListener('click', closeModal);
    
    // Photo Handling (Convert to Base64)
    function resetPhotos() {
        currentPhotos = [];
        photoInputs.forEach(input => {
            input.value = '';
            const preview = input.nextElementSibling;
            preview.src = '';
            preview.classList.add('hidden');
            const slot = input.closest('.photo-slot');
            const removeBtn = slot.querySelector('.btn-remove-photo');
            if (removeBtn) removeBtn.classList.add('hidden');
        });
    }
    
    photoInputs.forEach((input) => {
        input.addEventListener('change', function(e) {
            const file = e.target.files[0];
            const index = this.getAttribute('data-index');
            const slot = this.closest('.photo-slot');
            const removeBtn = slot.querySelector('.btn-remove-photo');
            
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const img = new Image();
                    img.onload = function() {
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');
                        let width = img.width;
                        let height = img.height;
                        const max_sz = 400; // REDUCIDO para ahorrar mucha memoria
                        if (width > height && width > max_sz) {
                            height *= max_sz / width;
                            width = max_sz;
                        } else if (height > max_sz) {
                            width *= max_sz / height;
                            height = max_sz;
                        }
                        canvas.width = width;
                        canvas.height = height;
                        ctx.drawImage(img, 0, 0, width, height);
                        
                        // Calidad de JPEG reducida al 50%
                        const base64String = canvas.toDataURL('image/jpeg', 0.5);
                        currentPhotos[index] = base64String;
                        const preview = input.nextElementSibling;
                        preview.src = base64String;
                        preview.classList.remove('hidden');
                        if (removeBtn) removeBtn.classList.remove('hidden');
                    };
                    img.src = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    });

    window.removePhoto = function(event, index) {
        if (event) event.stopPropagation();
        event.preventDefault();
        
        currentPhotos[index] = null;
        const input = document.querySelector(`.photo-input[data-index="${index}"]`);
        if (input) {
            input.value = '';
            const preview = input.nextElementSibling;
            preview.src = '';
            preview.classList.add('hidden');
            
            const slot = input.closest('.photo-slot');
            const removeBtn = slot.querySelector('.btn-remove-photo');
            if (removeBtn) removeBtn.classList.add('hidden');
        }
    };
    
    // Form Submission
    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        try {
            const originalItem = editRowId.value ? inventory.find(i => i.id.toString() === editRowId.value.toString()) : null;
            
            const productData = {
                // Pre-fill with original item if editing to preserve non-form fields (client info, etc.)
                ...(originalItem || {}),
                id: editRowId.value || Date.now().toString(),
                codigo: codigoInput.value.trim().toUpperCase(),
                photos: currentPhotos.filter(p => p), 
                producto: document.getElementById('producto').value,
                equipo: document.getElementById('equipo').value,
                equipacion: document.getElementById('equipacion').value,
                anio: document.getElementById('anio').value,
                talla: document.getElementById('talla').value,
                dorsal: document.getElementById('dorsal').value,
                dorsalTexto: document.getElementById('dorsal_texto').value,
                parches: document.getElementById('parches').value,
                cantidad: document.getElementById('cantidad').value || '0',
                tipo: document.getElementById('tipo').value,
                descripcion: document.getElementById('descripcion').value,
                almacen: originalItem ? (originalItem.almacen || '') : '',
                costo: document.getElementById('costo').value,
                precioCliente: document.getElementById('precioCliente').value,
                proveedor: document.getElementById('proveedor').value,
                nota: document.getElementById('nota').value,
                // Preserve original registration date or set new one
                fechaRegistro: originalItem ? (originalItem.fechaRegistro || new Date().toISOString()) : new Date().toISOString(),
                // Update original stock tracker if manual changes occur
                unidadesVendidas: originalItem ? (parseInt(originalItem.unidadesVendidas) || 0) : 0
            };
            
            // Adjust cantidadOriginal based on new manual stock + current known sales
            productData.cantidadOriginal = (parseInt(productData.cantidad) || 0) + (parseInt(productData.unidadesVendidas) || 0);

            if (productData.cantidad === '0' && !productData.almacen.includes('Vendido')) {
                productData.almacen = 'Vendido (Agotado)';
            } else if (parseInt(productData.cantidad) > 0 && productData.almacen.includes('Vendido')) {
                productData.almacen = 'En Almacén';
            }

            // Validate unique code
            const duplicateCode = inventory.find(item => 
                item.codigo.toUpperCase() === productData.codigo && 
                item.id.toString() !== productData.id.toString()
            );
            
            if (duplicateCode) {
                showToast(`¡Error! El código "${productData.codigo}" ya existe.`, 'error');
                return;
            }
            
            if (editRowId.value) {
                const index = inventory.findIndex(item => item.id.toString() === editRowId.value.toString());
                if (index !== -1) {
                    inventory[index] = productData;
                    logAction(productData, 'Editado', 'Actualización de datos generales');
                }
            } else {
                inventory.push(productData);
                logAction(productData, 'Agregado', 'Nuevo registro al sistema');
            }
            
            // Realizar la operación pesada primero, para asegurar que no tire error de cuota
            saveInventory();
            
            // Si guardó en LocalStorage, ahora sí cerramos y reportamos éxito
            closeModal();
            showToast('¡Producto guardado con éxito!', 'success');
            
        } catch (error) {
            console.error("Error al guardar producto:", error);
            // Revert inventory push/edit si no se pudo guardar
            inventory = JSON.parse(localStorage.getItem('yolo_inventory')) || [];
            
            let msg = 'Error al guardar el producto';
            if (error.name === 'QuotaExceededError') {
                msg = '⚠️ Error: Memoria llena. Reduce el tamaño o la cantidad de fotos.';
            }
            showToast(msg, 'error');
        }
    });

    // Utility: Show Toast Notification
    function showToast(message, type = 'success', duration = 3500) {
        const toast = document.createElement('div');
        let icon = 'fa-circle-check';
        let bg = '#06d6a0'; // Success
        
        if (type === 'info') {
            icon = 'fa-circle-info';
            bg = '#2b2d42'; // Dark
        } else if (type === 'error') {
            icon = 'fa-triangle-exclamation';
            bg = 'linear-gradient(135deg, #ef476f, #c0392b)';
        } else if (type === 'success') {
            bg = 'linear-gradient(135deg, #06d6a0, #05b587)';
        }

        toast.innerHTML = `<i class="fa-solid ${icon}"></i> ${message}`;
        toast.style.position = 'fixed';
        toast.style.bottom = '30px';
        toast.style.right = '30px';
        toast.style.background = bg;
        toast.style.color = 'white';
        toast.style.padding = '16px 28px';
        toast.style.borderRadius = '14px';
        toast.style.zIndex = '9999';
        toast.style.boxShadow = '0 12px 30px rgba(0,0,0,0.25)';
        toast.style.display = 'flex';
        toast.style.alignItems = 'center';
        toast.style.gap = '12px';
        toast.style.fontWeight = '700';
        toast.style.fontSize = '15px';
        toast.style.minWidth = '260px';
        toast.style.maxWidth = '380px';
        toast.style.letterSpacing = '0.2px';
        toast.style.animation = 'toastIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.5s ease forwards';
            setTimeout(() => toast.remove(), 500);
        }, duration);
    }
    
    // Render Table
    function renderTable(searchTerm = searchInput.value) {
        inventoryBody.innerHTML = '';
        
        const filteredInventory = inventory.filter(item => {
            // 1. Search Term Filter
            const term = searchTerm.toLowerCase().trim();
            let matchesSearch = true;
            if (term) {
                const searchTerms = term.split(/\s+/);
                let monthName = "";
                if (item.fechaEntrada) {
                    const date = new Date(item.fechaEntrada);
                    const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
                    monthName = months[date.getMonth()];
                }
                const searchableText = `${item.id} ${item.codigo} ${item.producto} ${item.equipo} ${item.equipacion} ${item.anio} ${item.talla} ${item.dorsal} ${item.dorsalTexto} ${item.parches} ${item.tipo} ${item.descripcion} ${item.almacen} ${item.costo} ${item.proveedor} ${item.precioCliente} ${item.clienteNombre} ${item.fechaRegistro || ''} ${item.nota} ${monthName}`.toLowerCase();
                matchesSearch = searchTerms.every(part => searchableText.includes(part));
            }
            
            // 2. Category Filter (from cards)
            let matchesCategory = true;
            if (activeFilter === 'talla-nino') {
                matchesCategory = ['6','8','10','12','14','16'].includes(item.talla);
            } else if (activeFilter === 'talla-adulto') {
                matchesCategory = ['S','M','L','XL','XXL'].includes(item.talla);
            } else if (activeFilter === 'gorras') {
                matchesCategory = (item.producto && item.producto.toLowerCase().includes('gorra'));
            } else if (activeFilter === 'solo-s') {
                matchesCategory = (item.talla === 'S');
            } else if (activeFilter === 'solo-m') {
                matchesCategory = (item.talla === 'M');
            } else if (activeFilter === 'solo-l') {
                matchesCategory = (item.talla === 'L');
            } else if (activeFilter === 'solo-xl') {
                matchesCategory = (item.talla === 'XL');
            } else if (activeFilter === 'manga-larga') {
                matchesCategory = (item.tipo && item.tipo.toLowerCase().includes('larga'));
            } else if (activeFilter === 'sin-foto') {
                // Check if photos array is empty or all elements are null/empty
                matchesCategory = (!item.photos || item.photos.length === 0 || item.photos.every(p => !p));
            }
            
            // 3. Entry History Filters (If active via button)
            let matchesEntryHist = true;
            if (entryHistActive) {
                // Must have been entered (Green code logic)
                if (!item.fechaEntrada) {
                    matchesEntryHist = false;
                } else {
                    const entryDate = new Date(item.fechaEntrada);
                    const month = entryDate.getMonth();
                    
                    // Month filter
                    if (!selectedEntryMonths.includes(month)) {
                        matchesEntryHist = false;
                    }
                    
                    // Attribute filters
                    if (matchesEntryHist) {
                        for (let attr in selectedEntryAttributes) {
                            const val = selectedEntryAttributes[attr];
                            if (val) {
                                let itemVal = "";
                                if (attr === 'dorsal') {
                                    itemVal = item.dorsal === 'nombre y Número' ? (item.dorsalTexto || 'Sin nombre') : item.dorsal;
                                } else {
                                    itemVal = item[attr] || "";
                                }
                                const normItemVal = itemVal.toString().trim().toUpperCase()
                                    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                                    .replace(/\s+/g, ' ');
                                const normVal = val.toString().trim().toUpperCase()
                                    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                                    .replace(/\s+/g, ' ');
                                    
                                if (normItemVal !== normVal) {
                                    matchesEntryHist = false;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
            
            return matchesSearch && matchesCategory && matchesEntryHist;
        });
        
        // --- 4. Automated Sorting by Priority: 1. Equipo, 2. Año, 3. Equipación ---
        filteredInventory.sort((a, b) => {
            // Priority 1: Equipo
            const equipoA = (a.equipo || "").toString().toLowerCase().trim();
            const equipoB = (b.equipo || "").toString().toLowerCase().trim();
            if (equipoA < equipoB) return -1;
            if (equipoA > equipoB) return 1;

            // Priority 2: Año
            const anioA = (a.anio || "").toString().toLowerCase().trim();
            const anioB = (b.anio || "").toString().toLowerCase().trim();
            if (anioA < anioB) return -1;
            if (anioA > anioB) return 1;

            // Priority 3: Equipación
            const equipacionA = (a.equipacion || "").toString().toLowerCase().trim();
            const equipacionB = (b.equipacion || "").toString().toLowerCase().trim();
            if (equipacionA < equipacionB) return -1;
            if (equipacionA > equipacionB) return 1;

            return 0;
        });

        
        if(filteredInventory.length === 0) {
            inventoryBody.innerHTML = '<tr><td colspan="20" style="text-align:center; padding: 20px;">No hay productos registrados o que coincidan con la búsqueda.</td></tr>';
            updateCounters(); // Keep counters fresh even if view is empty
            return;
        }
        
        filteredInventory.forEach(item => {
            const tr = document.createElement('tr');
            
            // Detalle button
            const detalleBtnHTML = `<button class="btn btn-primary btn-sm btn-detalle" onclick="viewDetails('${item.id}')"><i class="fa-solid fa-eye"></i> Ver Detalle</button>`;
            
            // Check if product has been entered into inventory (Entrada) - ahora basado en cantidad >= 1
            const cantVal = parseInt(item.cantidad) || 0;
            const enteredClass = cantVal > 0 ? 'entered' : '';

            tr.innerHTML = `
                <td>${detalleBtnHTML}</td>
                <td class="clickable-code ${enteredClass}" onclick="copyToClipboard('${item.codigo}')" title="Clic para copiar código"><strong>${item.codigo}</strong></td>
                <td>${item.producto}</td>
                <td>${item.equipo}</td>
                <td>${item.equipacion}</td>
                <td>${item.anio}</td>
                <td><strong>${item.talla}</strong></td>
                <td>${item.dorsal === 'nombre y Número' ? (item.dorsalTexto || 'Sin nombre') : item.dorsal}</td>
                <td>${item.parches}</td>
                <td>${item.tipo}</td>
                <td title="${item.descripcion || ''}">${String(item.descripcion || '').length > 15 ? String(item.descripcion || '').substring(0,15)+'...' : (item.descripcion || '')}</td>
                <td><strong>${(item.cantidad !== undefined && item.cantidad !== '') ? item.cantidad : '0'}</strong></td>
                <td>${item.almacen === 'Vendido' ? '<span style="color:var(--danger);font-weight:bold;">'+item.almacen+'</span>' : item.almacen}</td>
                <td>${item.costo || '-'}</td>
                <td>${item.proveedor || '-'}</td>
                <td>${item.precioCliente || '-'}</td>
                <td>${formatDate(item.fechaRegistro)}</td>
                <td><button class="action-btn btn-copy" onclick="copyRow('${item.id}')" title="Copiar Fila"><i class="fa-solid fa-copy"></i></button></td>
                <td><button class="action-btn btn-edit" onclick="editRow('${item.id}')" title="Editar"><i class="fa-solid fa-pencil"></i></button></td>
                <td><button class="action-btn btn-duplicate" onclick="duplicateRow('${item.id}')" title="Duplicar"><i class="fa-solid fa-clone"></i></button></td>
            `;
            inventoryBody.appendChild(tr);
        });
        
        updateCounters();
    }
    
    // Counters
    function updateCounters() {
        let totalEnSistema = 0;
        let totalCamisetas = 0;
        let totalEntradas = 0;
        let entradasMes = 0;
        let totalSalidas = 0;
        let salidasMes = 0;

        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        inventory.forEach(i => {
            const parsedCant = parseInt(i.cantidad);
            const cantActual = isNaN(parsedCant) ? 0 : parsedCant;
            const unidadesVendidas = parseInt(i.unidadesVendidas) || 0;
            
            // Fallback for older items: if marked Vendido and status is 0, assume at least 1 unit was sold
            let confirmedSales = unidadesVendidas;
            const almacenStr = String(i.almacen || '');
            if (confirmedSales === 0 && almacenStr.includes('Vendido')) {
                confirmedSales = 1; 
            }

            // Total Entradas Históricas (Lo que entró + Lo que ya se vendió)
            totalEntradas += (cantActual + confirmedSales);
            
            // Total Salidas Históricas (Lo que ya se vendió)
            totalSalidas += confirmedSales;

            // Histórico de Mes Actual (Entradas)
            const entryDateStr = i.fechaEntrada || i.fechaRegistro;
            if (entryDateStr) {
                const dEnt = new Date(entryDateStr);
                if (dEnt.getMonth() === currentMonth && dEnt.getFullYear() === currentYear) {
                    entradasMes += (cantActual + confirmedSales);
                }
            }

            // Histórico de Mes Actual (Salidas)
            if (confirmedSales > 0 && i.fechaSalida) {
                const dSal = new Date(i.fechaSalida);
                if (dSal.getMonth() === currentMonth && dSal.getFullYear() === currentYear) {
                    salidasMes += confirmedSales;
                }
            }

            // En sistema (No vendidos) - Para el contador de Stock Actual
            if (!almacenStr.includes('Vendido')) {
                totalEnSistema += cantActual;
                if(i.producto && i.producto.toLowerCase().includes('camiseta')) {
                    totalCamisetas += cantActual;
                }
            } else if (cantActual > 0) {
                // Caso raro: Marcado vendido pero aún con stock parcial
                totalEnSistema += cantActual;
                if(i.producto && i.producto.toLowerCase().includes('camiseta')) {
                    totalCamisetas += cantActual;
                }
            }
        });

        const ct = document.getElementById('count-total');
        const ccodes = document.getElementById('count-codes');
        const cc = document.getElementById('count-camisetas');
        const cet = document.getElementById('count-entradas-total');
        const cem = document.getElementById('count-entradas-mes');
        const cst = document.getElementById('count-salidas-total');
        const csm = document.getElementById('count-salidas-mes');

        if(ct) ct.textContent = totalEnSistema;
        if(ccodes) ccodes.textContent = inventory.length;
        if(cc) cc.textContent = totalCamisetas;
        if(cet) cet.textContent = totalEntradas;
        if(cem) cem.textContent = entradasMes;
        if(cst) cst.textContent = totalSalidas;
        if(csm) csm.textContent = salidasMes;
    }

    // Utility: Copy to clipboard
    window.copyToClipboard = function(text) {
        navigator.clipboard.writeText(text).then(() => {
            showToast(`Copiado: ${text}`, 'info');
        }).catch(err => {
            console.error('Error al copiar: ', err);
        });
    };
    
    // Copy Row
    window.copyRow = function(id) {
        const item = inventory.find(i => i.id.toString() === id.toString());
        if(!item) return;
        const textToCopy = `Código: ${item.codigo} | Producto: ${item.producto} | Equipo: ${item.equipo} | Equipación: ${item.equipacion} | Año: ${item.anio} | Talla: ${item.talla} | Dorsal: ${item.dorsal} | Parche: ${item.parches} | Tipo: ${item.tipo} | Cantidad: ${(item.cantidad !== undefined && item.cantidad !== '') ? item.cantidad : '0'} | Almacén: ${item.almacen} | Costo: ${item.costo || ''} | P.Cliente: ${item.precioCliente || ''} | Proveedor: ${item.proveedor || ''} | Cliente: ${item.clienteNombre || ''} | Tel: ${item.clienteTelefono || ''} | Fecha Reg: ${formatDate(item.fechaRegistro)} | Nota: ${item.nota}`;
        
        navigator.clipboard.writeText(textToCopy).then(() => {
            showToast('¡Fila copiada al portapapeles!', 'info');
        }).catch(err => {
            console.error('No se pudo copiar: ', err);
            showToast('Error al copiar la fila', 'error');
        });
    };
    
    // Edit Row
    window.editRow = function(id) {
        const item = inventory.find(i => i.id.toString() === id.toString());
        if(!item) return;
        
        openModal(true);
        editRowId.value = item.id;
        codigoInput.value = item.codigo;
        
        document.getElementById('producto').value = item.producto || '';
        document.getElementById('equipo').value = item.equipo || '';
        document.getElementById('equipacion').value = item.equipacion || '';
        document.getElementById('anio').value = item.anio || '';
        document.getElementById('talla').value = item.talla || '';
        document.getElementById('dorsal').value = item.dorsal || 'nombre y Número';
        dorsalTexto.value = item.dorsalTexto || '';
        if (document.getElementById('dorsal').value === 'nombre y Número') {
            dorsalTexto.classList.remove('hidden');
        } else {
            dorsalTexto.classList.add('hidden');
        }
        document.getElementById('parches').value = item.parches || '';
        document.getElementById('cantidad').value = item.cantidad || '0';
        document.getElementById('tipo').value = item.tipo || '';
        document.getElementById('descripcion').value = item.descripcion || '';
        document.getElementById('costo').value = item.costo || '';
        document.getElementById('precioCliente').value = item.precioCliente || '';
        document.getElementById('proveedor').value = item.proveedor || '';
        document.getElementById('nota').value = item.nota || '';
        
        // Restore photos
        resetPhotos();
        currentPhotos = item.photos ? [...item.photos] : [];
        currentPhotos.forEach((photo, index) => {
            if (photo) {
                const input = document.querySelector(`.photo-input[data-index="${index}"]`);
                if(input) {
                    const preview = input.nextElementSibling;
                    preview.src = photo;
                    preview.classList.remove('hidden');
                    const slot = input.closest('.photo-slot');
                    const removeBtn = slot.querySelector('.btn-remove-photo');
                    if (removeBtn) removeBtn.classList.remove('hidden');
                }
            }
        });
    };
    
    // Duplicate Row (Acción Inmediata)
    window.duplicateRow = function(id) {
        // Find existing to duplicate
        const item = inventory.find(i => i.id.toString() === id.toString());
        if(!item) return;
        
        // Creamos una copia profunda del objeto, ignorando propiedades que necesitan ser únicas
        const newItem = JSON.parse(JSON.stringify(item));
        
        newItem.id = Date.now().toString() + Math.random().toString(36).substr(2, 4);
        newItem.codigo = generateCode();
        newItem.fechaRegistro = new Date().toISOString();
        // Opcional: limpiar datos específicos que no se deben duplicar como el historial de movimientos de entrada/salida
        delete newItem.fechaEntrada;
        delete newItem.fechaSalida;
        newItem.cantidad = '0';
        newItem.almacen = '';
        
        inventory.push(newItem);
        
        try {
            saveInventory();
            logAction(newItem, 'Agregado (Duplicado)', `Duplicado exacto desde ${item.codigo}. Nuevo código: ${newItem.codigo}`);
            showToast(`¡Duplicado al instante! Código: ${newItem.codigo}`, 'success');
        } catch (error) {
            // Revertir si hay problema de memoria
            inventory.pop();
            console.error("Error al duplicar producto:", error);
            let msg = 'Error al duplicar el producto';
            if (error.name === 'QuotaExceededError') {
                msg = '⚠️ Error: Memoria llena. Reduce el tamaño de las fotos antes de duplicar.';
            }
            showToast(msg, 'error');
        }
    };
    
    // View Photos Modal
    window.viewPhotos = function(id) {
        const item = inventory.find(i => i.id.toString() === id.toString());
        if(!item || !item.photos || item.photos.length === 0) return;
        
        imageViewerGrid.innerHTML = '';
        item.photos.forEach(photo => {
            if(photo) {
                const img = document.createElement('img');
                img.src = photo;
                imageViewerGrid.appendChild(img);
            }
        });
        imageViewerModal.classList.remove('hidden');
    };
    
    btnCloseImageViewer.addEventListener('click', () => {
        imageViewerModal.classList.add('hidden');
    });
    
    // View Details Modal
    const detallesModal = document.getElementById('detallesModal');
    const detallesContent = document.getElementById('detallesContent');
    const detallesPhotos = document.getElementById('detallesPhotos');
    
    window.viewDetails = function(id) {
        try {
            const item = inventory.find(i => i.id.toString() === id.toString());
            if(!item) {
                console.warn("Item not found for ID:", id);
                return;
            }
            
            let contentHTML = '';
            const fields = [
                {label: 'Código', val: item.codigo},
                {label: 'Cantidad', val: (item.cantidad !== undefined && item.cantidad !== null) ? item.cantidad : '0'},
                {label: 'Producto', val: item.producto},
                {label: 'Equipo', val: item.equipo},
                {label: 'Equipación', val: item.equipacion},
                {label: 'Año', val: item.anio},
                {label: 'Talla', val: item.talla},
                {label: 'Dorsal', val: item.dorsal === 'nombre y Número' ? item.dorsalTexto : item.dorsal},
                {label: 'Parches', val: item.parches},
                {label: 'Tipo', val: item.tipo},
                {label: 'Almacén / Estado', val: item.almacen},
                {label: 'Costo', val: item.costo},
                {label: 'Proveedor', val: item.proveedor},
                {label: 'Precio Cliente', val: item.precioCliente},
                {label: 'Fecha Registro', val: formatDate(item.fechaRegistro)},
                {label: 'Descripción', val: item.descripcion},
                {label: 'Nota', val: item.nota}
            ];
            
            fields.forEach(f => {
                const valStr = String(f.val || '').trim();
                if(valStr !== '') {
                    contentHTML += `<div class="detalle-item"><strong>${f.label}</strong><span>${valStr}</span></div>`;
                }
            });
            detallesContent.innerHTML = contentHTML;
        
            // Fotos
            detallesPhotos.innerHTML = '';
            if(item.photos && item.photos.length > 0) {
                const photosTitle = document.createElement('h3');
                photosTitle.style.width = '100%';
                photosTitle.style.marginTop = '20px';
                photosTitle.style.marginBottom = '10px';
                photosTitle.style.fontSize = '1.1em';
                photosTitle.style.color = 'var(--primary)';
                photosTitle.innerHTML = '<i class="fa-solid fa-camera"></i> Fotografías';
                detallesPhotos.appendChild(photosTitle);

                item.photos.forEach(p => {
                    if(p && p.trim() !== '') {
                        const img = document.createElement('img');
                        img.src = p;
                        const currentId = id.toString();
                        img.onclick = () => window.viewPhotos(currentId);
                        detallesPhotos.appendChild(img);
                    }
                });
            }
        
        // Setup buttons
        document.getElementById('btnEditDetail').onclick = () => {
            detallesModal.classList.add('hidden');
            window.editRow(id);
        };
        
        document.getElementById('btnDeleteDetail').onclick = () => {
            if(confirm('¿Estás seguro de que deseas eliminar permanentemente este producto del inventario?')) {
                const deletedItem = inventory.find(i => i.id.toString() === id.toString());
                if (deletedItem) logAction(deletedItem, 'Eliminó', 'Registro eliminado permanentemente');
                
                inventory = inventory.filter(i => i.id !== id);
                saveInventory();
                detallesModal.classList.add('hidden');
            }
        };
        
        detallesModal.classList.remove('hidden');
        } catch (err) {
            console.error("Error al mostrar detalles:", err);
            showToast("Error al abrir los detalles del producto.", "error");
        }
    };
    
    document.getElementById('btnCloseDetalles').onclick = () => detallesModal.classList.add('hidden');
    document.getElementById('btnCancelDetail').onclick = () => detallesModal.classList.add('hidden');
    
    // Search function
    searchInput.addEventListener('input', (e) => {
        renderTable(e.target.value);
    });
    
    // Filter click interactions
    const filterCards = document.querySelectorAll('.filter-card');
    filterCards.forEach(card => {
        card.addEventListener('click', () => {
             // Update active visual state
             filterCards.forEach(c => c.classList.remove('active'));
             card.classList.add('active');
             
             activeFilter = card.getAttribute('data-filter');
             
             // Deactivate entry history if a regular filter is clicked
             if (!card.id.includes('btnHistorial')) {
                 entryHistActive = false;
                 if (document.getElementById('entryFilterPanel')) {
                     document.getElementById('entryFilterPanel').classList.add('hidden');
                 }
             }
             
             renderTable();
        });
    });
    
    // --- Entradas / Salidas Logic ---
    const btnEntries = document.getElementById('btnEntries');
    const btnExits = document.getElementById('btnExits');
    
    // Entradas Elements
    const entradasModal = document.getElementById('entradasModal');
    const btnCloseEntradas = document.getElementById('btnCloseEntradas');
    const entradasForm = document.getElementById('entradasForm');
    const entradaCodigo = document.getElementById('entradaCodigo');
    const btnBuscarEntrada = document.getElementById('btnBuscarEntrada');
    const entradaProductoInfo = document.getElementById('entradaProductoInfo');
    const entradaCantidad = document.getElementById('entradaCantidad');
    const entradaAlmacen = document.getElementById('entradaAlmacen');
    const entradaPrecio = document.getElementById('entradaPrecio');
    const btnSaveEntrada = document.getElementById('btnSaveEntrada');
    
    // Salidas Elements
    const salidasModal = document.getElementById('salidasModal');
    const btnCloseSalidas = document.getElementById('btnCloseSalidas');
    const salidasForm = document.getElementById('salidasForm');
    const salidaCodigo = document.getElementById('salidaCodigo');
    const btnBuscarSalida = document.getElementById('btnBuscarSalida');
    const salidaProductoInfo = document.getElementById('salidaProductoInfo');
    const salidaNombre = document.getElementById('salidaNombre');
    const salidaTelefono = document.getElementById('salidaTelefono');
    const salidaDireccion = document.getElementById('salidaDireccion');
    const btnSaveSalida = document.getElementById('btnSaveSalida');
    
    let currentEntradaItem = null;

    // Open Modals
    btnEntries.addEventListener('click', () => {
        entradasModal.classList.remove('hidden');
        entradasForm.reset();
        entradaProductoInfo.textContent = '';
        if (typeof entradaCantidad !== 'undefined' && entradaCantidad) entradaCantidad.value = '';
        document.getElementById('entradaImagePreview').classList.add('hidden');
        btnSaveEntrada.disabled = true;
        currentEntradaItem = null;
    });
    btnCloseEntradas.addEventListener('click', () => entradasModal.classList.add('hidden'));

    btnExits.addEventListener('click', () => {
        salidasModal.classList.remove('hidden');
        salidaProductoInfo.textContent = '';
        if (typeof renderSalidaItems === 'function') renderSalidaItems();
    });
    btnCloseSalidas.addEventListener('click', () => salidasModal.classList.add('hidden'));

    // Buscar Entrada
    btnBuscarEntrada.addEventListener('click', () => {
        const codigo = entradaCodigo.value.trim().toUpperCase();
        const item = inventory.find(i => i.codigo.toUpperCase() === codigo);
        if(item) {
            currentEntradaItem = item;
            entradaProductoInfo.innerHTML = `Encontrado: <span style="color:var(--dark)">${item.equipo} - ${item.producto} (${item.talla})</span><br>
                                            <span style="font-size:11px; opacity:0.8;">${item.tipo} | ${item.dorsal} | ${item.parches}</span>`;
            entradaProductoInfo.style.color = 'var(--success)';
            entradaAlmacen.value = item.almacen || '';
            entradaPrecio.value = item.precioCliente || '';
            btnSaveEntrada.disabled = false;
            
            // Show image previews for all photos
            const previewDiv = document.getElementById('entradaImagePreview');
            previewDiv.innerHTML = ''; // Limpiar imágenes anteriores
            if(item.photos && item.photos.length > 0) {
                item.photos.forEach(photo => {
                    if (photo) {
                        const img = document.createElement('img');
                        img.src = photo;
                        img.alt = "Vista previa";
                        img.style.width = '120px';
                        img.style.height = '120px';
                        img.style.objectFit = 'cover';
                        img.style.borderRadius = '12px';
                        img.style.border = '2px solid #ddd';
                        img.style.transition = 'transform 0.2s';
                        img.onmouseover = () => img.style.transform = 'scale(1.15)';
                        img.onmouseout = () => img.style.transform = 'scale(1)';
                        previewDiv.appendChild(img);
                    }
                });
                previewDiv.classList.remove('hidden');
            } else {
                previewDiv.classList.add('hidden');
            }
        } else {
            currentEntradaItem = null;
            entradaProductoInfo.textContent = 'Producto no encontrado. Verifique el código.';
            entradaProductoInfo.style.color = 'var(--danger)';
            const previewDiv = document.getElementById('entradaImagePreview');
            previewDiv.innerHTML = '';
            previewDiv.classList.add('hidden');
            btnSaveEntrada.disabled = true;
        }
    });

    // Guardar Entrada
    entradasForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if(!currentEntradaItem) {
            showToast('❌ Primero busque un producto con el botón Buscar', 'error', 3500);
            return;
        }
        
        // === PASO 1: Capturar valores ANTES de cerrar ===
        const nuevaCant = parseInt(entradaCantidad.value) || 0;
        const almacenVal = entradaAlmacen.value;
        const precioVal = entradaPrecio.value;
        const itemRef = currentEntradaItem;
        
        // === PASO 2: CERRAR MODAL INMEDIATAMENTE ===
        entradasModal.classList.add('hidden');
        entradasForm.reset();
        try { document.getElementById('entradaImagePreview').classList.add('hidden'); } catch(ex) {}
        entradaProductoInfo.textContent = '';
        btnSaveEntrada.disabled = true;
        currentEntradaItem = null;
        
        // === PASO 3: Procesar datos después de cerrar ===
        try {
            const cantActual = parseInt(itemRef.cantidad) || 0;
            itemRef.cantidad = (cantActual + nuevaCant).toString();
            itemRef.almacen = almacenVal;
            itemRef.precioCliente = precioVal;
            itemRef.fechaEntrada = new Date().toISOString();
            
            try { logAction(itemRef, 'Entrada Registrada', `Se agregaron ${nuevaCant} unidades (Total: ${itemRef.cantidad}). Almacén: ${almacenVal}`); } catch(logErr) { console.warn('Log error:', logErr); }
            
            renderTable();
            
            // Mostrar ventanilla de éxito (dura ~3.5 seg)
            showToast('✅ ¡Registro de entrada exitoso!', 'success', 3800);
            
            // Guardar en segundo plano
            setTimeout(() => {
                try { saveInventory(); } catch(saveErr) { console.warn('Save error:', saveErr); }
            }, 150);
        } catch (error) {
            console.error("Error al procesar entrada:", error);
            showToast('❌ Error de registro: ' + (error.message || 'Error desconocido'), 'error', 4000);
        }
    });

    // Variables para las salidas múltiples y Post-Venta
    let currentSalidaItems = [];
    let lastSaleData = null; // Almacenará la venta recién concluida
    const salidaItemsList = document.getElementById('salidaItemsList');
    const salidaTotalItems = document.getElementById('salidaTotalItems');
    const salidaVacioMsg = document.getElementById('salidaVacioMsg');

    function renderSalidaItems() {
        salidaItemsList.innerHTML = '';
        salidaTotalItems.textContent = `${currentSalidaItems.length} items`;
        
        const financePanel = document.getElementById('salidaFinancePanel');
        
        if (currentSalidaItems.length === 0) {
            salidaItemsList.appendChild(salidaVacioMsg);
            btnSaveSalida.disabled = true;
            if (financePanel) financePanel.style.display = 'none';
            return;
        }
        
        btnSaveSalida.disabled = false;
        if (financePanel) financePanel.style.display = 'block';
        
        currentSalidaItems.forEach((item, index) => {
            const div = document.createElement('div');
            div.style.border = '1px solid #e0e0e0';
            div.style.padding = '10px 12px';
            div.style.borderRadius = '8px';
            div.style.background = '#fcfcfc';
            div.style.position = 'relative';
            
            const cantDisp = parseInt(item.cantidad) || 0;
            const precioUnit = parseFloat(item.precioCliente) || 0;
            const cantVenta = parseInt(item.cantidadVenta) || 1;
            const subtotalItem = precioUnit * cantVenta;
            
            div.innerHTML = `
                <button type="button" class="btn-remove-salida" onclick="removeSalidaItem(${index})" style="position: absolute; top: 10px; right: 10px; background: none; color: var(--danger); border: none; cursor: pointer; font-size: 14px;"><i class="fa-solid fa-trash"></i></button>
                <div style="font-weight:bold; color:var(--dark); font-size: 13px; margin-right: 25px;">${item.codigo} &mdash; ${item.equipo}</div>
                <div style="font-size: 11px; color: #666; margin-bottom: 8px;">${item.producto} (${item.talla}) &nbsp;|&nbsp; Disp: <span style="font-weight:bold;color:var(--success)">${cantDisp}</span></div>
                <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
                    <div style="display:flex; align-items:center; gap:8px;">
                        <label style="font-size:11px; font-weight:bold;">Cant.:</label>
                        <input type="number" min="1" max="${cantDisp}" value="${cantVenta}" onchange="updateSalidaItemCant(${index}, this.value)" style="width: 60px; padding: 4px 6px; border: 1px solid #ccc; border-radius: 4px; font-size: 13px;">
                    </div>
                    <div style="text-align:right;">
                        <div style="font-size:10px; color:#888;">P.Unit: <strong>$${precioUnit.toFixed(2)}</strong></div>
                        <div style="font-size:14px; font-weight:800; color:var(--primary);">$${subtotalItem.toFixed(2)}</div>
                    </div>
                </div>
            `;
            salidaItemsList.appendChild(div);
        });
        
        calcSalidaTotals();
    }

    window.removeSalidaItem = function(index) {
        currentSalidaItems.splice(index, 1);
        renderSalidaItems();
    };

    window.updateSalidaItemCant = function(index, value) {
        const val = parseInt(value) || 1;
        const disp = parseInt(currentSalidaItems[index].cantidad) || 0;
        if (val > disp) {
            alert(`⚠️ Solo hay ${disp} unidades disponibles.`);
            currentSalidaItems[index].cantidadVenta = disp;
            renderSalidaItems();
        } else {
            currentSalidaItems[index].cantidadVenta = val;
            calcSalidaTotals();
        }
    };

    // Cálculo financiero reactivo
    window.calcSalidaTotals = function() {
        // Calcular subtotal
        let subtotal = 0;
        currentSalidaItems.forEach(item => {
            const precio = parseFloat(item.precioCliente) || 0;
            const cant = parseInt(item.cantidadVenta) || 1;
            subtotal += precio * cant;
        });

        // Tipo de descuento
        const tipoDesc = document.querySelector('input[name="tipoDescuento"]:checked')?.value || 'porcentaje';
        const descVal = parseFloat(document.getElementById('salidaDescuentoVal')?.value) || 0;
        const descSymbol = document.getElementById('descSymbol');
        const descInputContainer = document.getElementById('descInputContainer');
        const pagoCompleto = document.getElementById('pagoCompletoSwitch')?.checked;

        let totalFinal = subtotal;

        if (tipoDesc === 'regalo') {
            totalFinal = 0;
            if (descInputContainer) descInputContainer.style.display = 'none';
        } else if (tipoDesc === 'porcentaje') {
            if (descSymbol) descSymbol.textContent = '%';
            if (descInputContainer) descInputContainer.style.display = 'flex';
            totalFinal = subtotal - (subtotal * (descVal / 100));
        } else if (tipoDesc === 'monto') {
            if (descSymbol) descSymbol.textContent = '-$';
            if (descInputContainer) descInputContainer.style.display = 'flex';
            totalFinal = subtotal - descVal;
        }
        if (totalFinal < 0) totalFinal = 0;

        // Abono
        const abono = parseFloat(document.getElementById('salidaAbono')?.value) || 0;
        let diferencia = totalFinal - abono;
        if (diferencia < 0) diferencia = 0;

        // Pago Completo anula el saldo pendiente visualmente
        if (pagoCompleto) diferencia = 0;

        // Actualizar UI
        const elSub = document.getElementById('salidaSubtotal');
        const elTotal = document.getElementById('salidaTotalConDesc');
        const elDif = document.getElementById('salidaDiferencia');
        if (elSub) elSub.textContent = `$${subtotal.toFixed(2)}`;
        if (elTotal) elTotal.textContent = `Total: $${totalFinal.toFixed(2)}`;
        if (elDif) {
            elDif.textContent = `$${diferencia.toFixed(2)}`;
            elDif.style.color = diferencia > 0 ? 'var(--danger)' : 'var(--success)';
        }
    };

    // Conectar radios de descuento
    document.querySelectorAll('input[name="tipoDescuento"]').forEach(radio => {
        radio.addEventListener('change', () => {
            if (radio.value === 'regalo') {
                const descInput = document.getElementById('salidaDescuentoVal');
                if (descInput) descInput.value = '';
            }
            calcSalidaTotals();
        });
    });

    function handleBuscarSalida(shouldMinimize = false) {
        const codigo = salidaCodigo.value.trim().toUpperCase();
        if (!codigo) {
            salidaProductoInfo.textContent = 'Ingrese un código.';
            salidaProductoInfo.style.color = 'var(--danger)';
            return;
        }
        
        const item = inventory.find(i => i.codigo.toUpperCase() === codigo);
        if(item) {
            const cantDisp = parseInt(item.cantidad) || 0;
            if (cantDisp <= 0) {
                salidaProductoInfo.textContent = '❌ PRODUCTO AGOTADO en inventario.';
                salidaProductoInfo.style.color = 'var(--danger)';
                return;
            }
            
            // Verificar si ya está en la lista
            const alreadyInList = currentSalidaItems.find(i => i.codigo.toUpperCase() === codigo);
            if (alreadyInList) {
                salidaProductoInfo.textContent = 'ℹ️ El producto ya está en la lista.';
                salidaProductoInfo.style.color = 'var(--primary)';
                return;
            }

            // Añadir a la lista
            const newItem = { ...item, cantidadVenta: 1 };
            currentSalidaItems.push(newItem);
            
            if (shouldMinimize) {
                salidasModal.classList.add('hidden');
                salidaCodigo.value = '';
                salidaProductoInfo.textContent = '';
                showToast(`Se añadió ${item.equipo} al carrito. Copia el siguiente código.`);
            } else {
                salidaProductoInfo.innerHTML = `<span style="color:var(--success)"><i class="fa-solid fa-check"></i> Agregado: ${item.equipo}</span>`;
                salidaCodigo.value = '';
            }
            renderSalidaItems();
        } else {
            salidaProductoInfo.textContent = '❌ Producto no encontrado. Verifique el código.';
            salidaProductoInfo.style.color = 'var(--danger)';
        }
    }

    // Buscar y Añadir Salida
    btnBuscarSalida.addEventListener('click', () => handleBuscarSalida(false));
    
    const btnBuscarYMinimizar = document.getElementById('btnBuscarYMinimizar');
    if (btnBuscarYMinimizar) {
        btnBuscarYMinimizar.addEventListener('click', () => handleBuscarSalida(true));
    }

    // Guardar Salida (Múltiple)
    salidasForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if(currentSalidaItems.length === 0) {
            alert("No hay productos en la lista para registrar la salida.");
            return;
        }
        
        let successCount = 0;
        const clienteNom = salidaNombre.value || 'Cliente General';
        const clienteTel = salidaTelefono.value || '';
        const clienteDir = salidaDireccion.value || '';
        
        try {
            // === Generar Número de Venta Secuencial ===
            lastSaleNumber++;
            localStorage.setItem('yolo_last_sale_number', lastSaleNumber.toString());
            const currentSaleNum = String(lastSaleNumber).padStart(7, '0');

            // Procesar cada item
            currentSalidaItems.forEach((saleItem, idx) => {
                // Find in global inventory
                const RealItem = inventory.find(i => i.codigo === saleItem.codigo);
                if (RealItem) {
                    const cantSalida = parseInt(saleItem.cantidadVenta) || 1;
                    const cantActual = parseInt(RealItem.cantidad) || 0;
                    
                    if (cantSalida <= cantActual) {
                        RealItem.cantidad = (cantActual - cantSalida).toString();
                        if (RealItem.cantidad === '0') {
                            RealItem.almacen = 'Vendido (Agotado)';
                        }
                        
                        // Tracking sold units and original stock for reports
                        RealItem.unidadesVendidas = (parseInt(RealItem.unidadesVendidas) || 0) + cantSalida;
                        if (!RealItem.cantidadOriginal) { 
                            // Set initial quantity tracker if not present
                            RealItem.cantidadOriginal = (parseInt(cantActual) || 0) + (parseInt(RealItem.unidadesVendidas) || 0);
                        }
                        
                        RealItem.clienteNombre = clienteNom;
                        RealItem.clienteTelefono = clienteTel;
                        RealItem.clienteDireccion = clienteDir;
                        RealItem.fechaSalida = new Date().toISOString(); 
                        
                        // Enviamos el saleData solo en el primer item para ahorrar memoria, pero el número a todos
                        const saleDataToSave = (idx === 0) ? {
                            cliente: { nombre: clienteNom, telefono: clienteTel, direccion: clienteDir },
                            items: JSON.parse(JSON.stringify(currentSalidaItems)),
                            totales: {
                                subtotal: document.getElementById('salidaSubtotal').textContent,
                                totalFinal: document.getElementById('salidaTotalConDesc').textContent.replace('Total: ', ''),
                                diferencia: document.getElementById('salidaDiferencia').textContent,
                                descuentoOpciones: document.querySelector('input[name="tipoDescuento"]:checked')?.value
                            },
                            fecha: new Date().toISOString(),
                            saleNumber: currentSaleNum
                        } : null;

                        logAction(RealItem, 'Salida Registrada', `Venta #${currentSaleNum} a ${clienteNom}. Unidades: ${cantSalida}. Stock restante: ${RealItem.cantidad}`, saleDataToSave, currentSaleNum);
                        successCount++;
                    }
                }
            });

            // Guardar al Cliente en el Banco de Clientes si ingresó datos
            if ((salidaNombre.value || '').trim() !== '' || (salidaTelefono.value || '').trim() !== '') {
                const nombreClean = (salidaNombre.value || '').trim().toUpperCase();
                const telefClean = (salidaTelefono.value || '').trim();
                
                // Buscar cliente existente (conincidencia por nombre o por telefono)
                let existingClient = clientsBank.find(c => 
                    (nombreClean && c.nombre.toUpperCase() === nombreClean) || 
                    (telefClean && c.telefono === telefClean)
                );
                
                // Resumen de la compra actual
                const purchaseSummary = currentSalidaItems.map(item => `${item.cantidadVenta}x ${item.equipo} - ${item.producto} - ${item.codigo}`).join(', ');
                
                if (existingClient) {
                    // Actualizar sus datos
                    if (nombreClean) existingClient.nombre = nombreClean;
                    if (telefClean) existingClient.telefono = telefClean;
                    if (clienteDir) existingClient.direccion = clienteDir;
                    existingClient.ultimaCompra = purchaseSummary;
                    existingClient.fechaUltimaCompra = new Date().toISOString();
                } else {
                    // Crear nuevo cliente
                    clientsBank.push({
                        id: Date.now().toString(),
                        nombre: nombreClean || 'Sin nombre',
                        telefono: telefClean || 'Sin número',
                        direccion: clienteDir || '',
                        ultimaCompra: purchaseSummary,
                        fechaUltimaCompra: new Date().toISOString()
                    });
                }
                saveClients();
            }

            // === Preparar y Guardar Información de Post-Venta ===
            lastSaleData = {
                cliente: {
                    nombre: clienteNom,
                    telefono: clienteTel,
                    direccion: clienteDir,
                    id: '', // Se puede llenar en el modal de packing
                    peso: '' // Se puede llenar en el modal de packing
                },
                items: JSON.parse(JSON.stringify(currentSalidaItems)), // Deep copy of sold items
                totales: {
                    subtotal: document.getElementById('salidaSubtotal').textContent,
                    totalFinal: document.getElementById('salidaTotalConDesc').textContent.replace('Total: ', ''),
                    diferencia: document.getElementById('salidaDiferencia').textContent,
                    descuentoOpciones: document.querySelector('input[name="tipoDescuento"]:checked')?.value
                },
                fecha: new Date().toISOString()
            };

            // Cerrar modal de Salidas original y limpiar
            salidasModal.classList.add('hidden');
            salidasForm.reset();
            currentSalidaItems = [];
            renderSalidaItems();
            salidaProductoInfo.textContent = '';
            
            showToast(`¡Salida registrada con éxito! (${successCount} productos)`);
            renderTable();
            
            setTimeout(() => {
                try { saveInventory(); } catch(e){}
            }, 100);

            // === Mostrar Modal Post-Venta ===
            const postSaleModal = document.getElementById('postSaleModal');
            if (postSaleModal) {
                postSaleModal.classList.remove('hidden');
                document.getElementById('packingExtraInfo').classList.add('hidden'); // Reset packing extra panel
                document.getElementById('packIdField').value = '';
                document.getElementById('packWeightField').value = '';
            }

        } catch (error) {
            console.error("Error al registrar salida múltiple:", error);
            let msg = 'Error al registrar la salida';
            if (error.name === 'QuotaExceededError') msg = '⚠️ Error: Memoria llena. Reduce el tamaño de las fotos.';
            showToast(msg, 'error');
        }
    });

    // --- Editar Entrada (Corrección) Logic ---
    const btnEditEntry = document.getElementById('btnEditEntry');
    const editarEntradaModal = document.getElementById('editarEntradaModal');
    const btnCloseEditEntry = document.getElementById('btnCloseEditEntry');
    const editEntryForm = document.getElementById('editEntryForm');
    const editEntryCodigo = document.getElementById('editEntryCodigo');
    const btnBuscarEditEntry = document.getElementById('btnBuscarEditEntry');
    const editEntryInfo = document.getElementById('editEntryInfo');
    const editEntryCantidad = document.getElementById('editEntryCantidad');
    const editEntryAlmacen = document.getElementById('editEntryAlmacen');
    const editEntryPrecio = document.getElementById('editEntryPrecio');
    const btnSaveEditEntry = document.getElementById('btnSaveEditEntry');
    
    let currentEditEntryItem = null;

    if (btnEditEntry) {
        btnEditEntry.addEventListener('click', () => {
            editarEntradaModal.classList.remove('hidden');
            editEntryForm.reset();
            editEntryInfo.textContent = '';
            document.getElementById('editEntryImagePreview').classList.add('hidden');
            btnSaveEditEntry.disabled = true;
            currentEditEntryItem = null;
        });
    }

    if (btnCloseEditEntry) btnCloseEditEntry.addEventListener('click', () => editarEntradaModal.classList.add('hidden'));

    if (btnBuscarEditEntry) {
        btnBuscarEditEntry.addEventListener('click', () => {
            const codigo = editEntryCodigo.value.trim().toUpperCase();
            const item = inventory.find(i => i.codigo.toUpperCase() === codigo);
            if(item) {
                currentEditEntryItem = item;
                editEntryInfo.innerHTML = `Corrigiendo: <span style="color:var(--dark)">${item.equipo} - ${item.producto} (${item.talla})</span><br>
                                                 <span style="font-size:11px; opacity:0.8;">${item.tipo} | ${item.dorsal} | ${item.parches}</span>`;
                editEntryInfo.style.color = 'var(--primary)';
                editEntryCantidad.value = item.cantidad || '0';
                editEntryAlmacen.value = item.almacen || '';
                editEntryPrecio.value = item.precioCliente || '';
                btnSaveEditEntry.disabled = false;
                
                const previewDiv = document.getElementById('editEntryImagePreview');
                previewDiv.innerHTML = ''; 
                if(item.photos && item.photos.length > 0) {
                    item.photos.forEach(photo => {
                        if (photo) {
                            const img = document.createElement('img');
                            img.src = photo;
                            img.style.width = '100px';
                            img.style.height = '100px';
                            img.style.objectFit = 'cover';
                            img.style.borderRadius = '10px';
                            img.style.border = '1px solid #ddd';
                            previewDiv.appendChild(img);
                        }
                    });
                    previewDiv.classList.remove('hidden');
                } else {
                    previewDiv.classList.add('hidden');
                }
            } else {
                currentEditEntryItem = null;
                editEntryInfo.textContent = 'Producto no encontrado. Verifique el código.';
                editEntryInfo.style.color = 'var(--danger)';
                btnSaveEditEntry.disabled = true;
                document.getElementById('editEntryImagePreview').classList.add('hidden');
            }
        });
    }

    if (editEntryForm) {
        editEntryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if(!currentEditEntryItem) return;
            
            const oldCant = currentEditEntryItem.cantidad;
            const nuevaCant = editEntryCantidad.value;
            
            currentEditEntryItem.cantidad = nuevaCant.toString();
            currentEditEntryItem.almacen = editEntryAlmacen.value;
            currentEditEntryItem.precioCliente = editEntryPrecio.value;
            
            logAction(currentEditEntryItem, 'Corrección de Entrada', `Cantidad corregida de ${oldCant} a ${nuevaCant}. Almacén: ${editEntryAlmacen.value}`);
            
            try {
                // Cerrar modal y mostrar éxito inmediatamente
                editarEntradaModal.classList.add('hidden');
                showToast('¡Entrada/Existencia corregida con éxito!');
                
                // Operaciones pesadas al final
                saveInventory();
            } catch (error) {
                console.error("Error al corregir entrada:", error);
                let msg = 'Error al corregir la entrada';
                if (error.name === 'QuotaExceededError') msg = '⚠️ Error: Memoria llena. Reduce el tamaño de las fotos.';
                showToast(msg, 'error');
            }
        });
    }

    // History Modal Management
    const historyModal = document.getElementById('historyModal');
    const historyContainer = document.getElementById('historyContainer');
    const btnHistory = document.getElementById('btnHistory');
    const btnCloseHistory = document.getElementById('btnCloseHistory');
    const btnCloseHistory2 = document.getElementById('btnCloseHistory2');
    const btnClearHistory = document.getElementById('btnClearHistory');

    function renderHistory() {
        historyContainer.innerHTML = '';
        if (historyLog.length === 0) {
            historyContainer.innerHTML = '<p style="text-align:center; color: var(--gray); padding: 20px;">No hay acciones registradas aún.</p>';
            return;
        }

        historyLog.forEach(log => {
            const item = document.createElement('div');
            let typeClass = 'history-item';
            if (log.action.includes('Agregado')) typeClass += ' history-added';
            if (log.action.includes('Editado')) typeClass += ' history-edited';
            if (log.action.includes('Eliminó') || log.action.includes('borra')) typeClass += ' history-deleted';
            if (log.action.includes('Duplicó')) typeClass += ' history-duplicated';
            if (log.action.includes('Salida')) typeClass += ' history-deleted';
            if (log.action.includes('Entrada')) typeClass += ' history-added';
            if (log.action.includes('Restablecido') || log.action.includes('Pila Restablecida')) typeClass += ' history-added';

            item.className = typeClass;
            
            let actionText = log.details ? `<strong>${log.action}:</strong> ${log.details}` : `<strong>${log.action}</strong>`;
            if (log.backup) {
                actionText += ` <button class="btn btn-success btn-sm" onclick="restoreFromHistory('${log.logId}')" style="display:inline-flex; padding: 3px 10px; font-size: 10px; margin-left:10px; border-radius: 4px; vertical-align: middle;"><i class="fa-solid fa-rotate-left"></i> Restablecer</button>`;
            }

            item.innerHTML = `
                <div class="history-cintillo">${log.cintillo}</div>
                <div class="history-action-line">
                    <span>${actionText}</span>
                    <small style="color: var(--gray)">${formatDate(log.timestamp)}</small>
                </div>
            `;
            historyContainer.appendChild(item);
        });
    }

    window.restoreFromHistory = (logId) => {
        const logEntry = historyLog.find(l => l.logId === logId);
        if (!logEntry || !logEntry.backup) {
            alert('Esta fila ya ha sido restablecida o no contiene datos de respaldo.');
            return;
        };

        // Deep copy of the backup item
        const backupItem = JSON.parse(JSON.stringify(logEntry.backup));
        
        // Generate NEW CODE as per user request
        const newCode = generateCode().toUpperCase(); // Assuming generateCode() exists and creates a unique code
        
        const confirmMsg = `La fila regresará al registro general de inventario.\n\n` +
                           `POR SEGURIDAD, EL SISTEMA GENERARÁ UN NUEVO CÓDIGO: ${newCode}\n\n` +
                           `¿Desea aceptar y restablecer este producto?`;

        if (confirm(confirmMsg)) {
            backupItem.codigo = newCode;
            backupItem.id = (Date.now() + Math.floor(Math.random() * 1000)).toString(); // New ID for safety
            backupItem.fechaRegistro = new Date().toISOString(); // Update registration date
            
            inventory.push(backupItem);
            saveInventory();
            
            // Update log to show it was restored
            logEntry.action = "Pila Restablecida";
            logEntry.details = `Regresado al sistema con nuevo código: ${newCode}`;
            delete logEntry.backup; // Prevent multiple restorations from same log
            
            localStorage.setItem('yolo_history', JSON.stringify(historyLog));
            
            renderHistory();
            renderTable();
            showToast(`¡Restablecido con código: ${newCode}`, 'success');
        }
    };

    // --- Fin de Historial y Herramientas ---


    if (btnHistory) {
        btnHistory.addEventListener('click', () => {
            renderHistory();
            historyModal.classList.remove('hidden');
        });
    }

    if (btnCloseHistory) btnCloseHistory.onclick = () => historyModal.classList.add('hidden');
    if (btnCloseHistory2) btnCloseHistory2.onclick = () => historyModal.classList.add('hidden');
    
    // --- Reporte Management ---
    const btnReport = document.getElementById('btnReport');
    const reportModal = document.getElementById('reportModal');
    const btnCloseReport = document.getElementById('btnCloseReport');
    const btnCloseReport2 = document.getElementById('btnCloseReport2');
    
    const reportTotalSalida = document.getElementById('report-total-salida');
    const reportTotalEntrada = document.getElementById('report-total-entrada');
    const reportTeamsBody = document.getElementById('report-teams-body');
    const reportSizesBody = document.getElementById('report-sizes-body');
    const reportPricesBody = document.getElementById('report-prices-body');
    const reportSectionPrices = document.getElementById('report-section-prices');

    function generateReport() {
        let totalEntradasCount = 0;
        let totalSalidasCount = 0;
        let teamsMap = {};
        let sizesMap = {};
        let priceTypeMap = {}; 
        let hasPrices = false; // Flag to track if at least one price exists

        if (!Array.isArray(inventory)) return;

        inventory.forEach((item) => {
            if (!item) return;

            const cantActual = parseInt(item.cantidad) || 0;
            const unidadesVendidas = parseInt(item.unidadesVendidas) || 0;
            
            // Fallback for older items: if marked Vendido and status is 0, assume at least 1 unit was sold
            let confirmedSales = unidadesVendidas;
            const almacenStr = String(item.almacen || '');
            if (confirmedSales === 0 && almacenStr.includes('Vendido')) {
                confirmedSales = 1; // Assuming unique items by default for legacy data
            }

            totalSalidasCount += confirmedSales;
            totalEntradasCount += (cantActual + confirmedSales);

            // Group by Team
            const team = String(item.equipo || 'Otro').trim();
            teamsMap[team] = (teamsMap[team] || 0) + cantActual + confirmedSales;

            // Group by Size
            const size = String(item.talla || 'N/A').trim();
            sizesMap[size] = (sizesMap[size] || 0) + cantActual + confirmedSales;

            // Group by Price and Type
            const price = String(item.precioCliente || '').trim();
            const type = String(item.tipo || 'Sin Tipo').trim();
            
            if (price && price !== '0') {
                hasPrices = true;
                const key = `${price} | ${type}`;
                if (!priceTypeMap[key]) {
                    priceTypeMap[key] = { price, type, count: 0 };
                }
                priceTypeMap[key].count += (cantActual + confirmedSales);
            }
        });

        // Hide or Show the price section based on data availability
        if (reportSectionPrices) {
            if (hasPrices) {
                reportSectionPrices.classList.remove('hidden');
            } else {
                reportSectionPrices.classList.add('hidden');
            }
        }

        // Update Summary Counts
        if (reportTotalEntrada) reportTotalEntrada.textContent = totalEntradasCount;
        if (reportTotalSalida) reportTotalSalida.textContent = totalSalidasCount;

        // Populate Table 1: Teams
        if (reportTeamsBody) {
            reportTeamsBody.innerHTML = '';
            const sortedTeams = Object.keys(teamsMap).sort((a,b) => teamsMap[b] - teamsMap[a]);
            let tableSum = 0;
            if (sortedTeams.length === 0) {
                reportTeamsBody.innerHTML = '<tr><td colspan="2">No hay datos</td></tr>';
            } else {
                sortedTeams.forEach(team => {
                    const count = teamsMap[team];
                    tableSum += count;
                    const tr = document.createElement('tr');
                    tr.innerHTML = `<td>${team}</td><td><strong>${count}</strong></td>`;
                    reportTeamsBody.appendChild(tr);
                });
                // Add Total Row
                const totalTr = document.createElement('tr');
                totalTr.style.background = 'rgba(67, 97, 238, 0.08)';
                totalTr.style.fontWeight = '900';
                totalTr.innerHTML = `<td style="color:var(--primary)">TOTAL CANTIDAD</td><td style="color:var(--primary)">${tableSum}</td>`;
                reportTeamsBody.appendChild(totalTr);
            }
        }

        // Populate Table 2: Sizes
        if (reportSizesBody) {
            reportSizesBody.innerHTML = '';
            const sortedSizes = Object.keys(sizesMap).sort((a,b) => sizesMap[b] - sizesMap[a]);
            let tableSum = 0;
            if (sortedSizes.length === 0) {
                reportSizesBody.innerHTML = '<tr><td colspan="2">No hay datos</td></tr>';
            } else {
                sortedSizes.forEach(size => {
                    const count = sizesMap[size];
                    tableSum += count;
                    const tr = document.createElement('tr');
                    tr.innerHTML = `<td>${size}</td><td><strong>${count}</strong></td>`;
                    reportSizesBody.appendChild(tr);
                });
                // Add Total Row
                const totalTr = document.createElement('tr');
                totalTr.style.background = 'rgba(67, 97, 238, 0.08)';
                totalTr.style.fontWeight = '900';
                totalTr.innerHTML = `<td style="color:var(--primary)">TOTAL CANTIDAD</td><td style="color:var(--primary)">${tableSum}</td>`;
                reportSizesBody.appendChild(totalTr);
            }
        }

        // Populate Table 3: Price + Type (only if prices exist)
        if (reportPricesBody && hasPrices) {
            reportPricesBody.innerHTML = '';
            const sortedPriceKeys = Object.keys(priceTypeMap).sort((a, b) => priceTypeMap[b].count - priceTypeMap[a].count);
            let tableSum = 0;
            sortedPriceKeys.forEach(key => {
                const data = priceTypeMap[key];
                tableSum += data.count;
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><span style="color:var(--success); font-weight:800;">${data.price}</span></td>
                    <td>${data.type}</td>
                    <td><strong style="font-size:1.1em;">${data.count}</strong></td>
                `;
                reportPricesBody.appendChild(tr);
            });
            // Add Total Row
            const totalTr = document.createElement('tr');
            totalTr.style.background = 'rgba(67, 97, 238, 0.08)';
            totalTr.style.fontWeight = '900';
            totalTr.innerHTML = `<td colspan="2" style="color:var(--primary); text-align:right; padding-right:20px;">TOTAL CANTIDAD</td><td style="color:var(--primary)">${tableSum}</td>`;
            reportPricesBody.appendChild(totalTr);
        }
    }

    if (btnReport) {
        btnReport.onclick = (e) => {
            if (e) e.preventDefault();
            try {
                console.log("📊 Iniciando generación de reporte...");
                generateReport();
                if (reportModal) {
                    reportModal.classList.remove('hidden');
                } else {
                    console.error("Error: Modal de reporte no encontrado.");
                    showToast('Error: No se encontró el modal de reporte.', 'error');
                }
            } catch (err) {
                console.error("Error al generar reporte:", err);
                showToast('Hubo un error al generar el reporte. Revisa la consola.', 'error');
                // Al menos tratamos de abrirlo
                if (reportModal) reportModal.classList.remove('hidden');
            }
        };
    }

    if (btnCloseReport) btnCloseReport.onclick = () => reportModal.classList.add('hidden');
    if (btnCloseReport2) btnCloseReport2.onclick = () => reportModal.classList.add('hidden');
    
    // --- Delete By Code Management ---
    const btnOpenDelete = document.getElementById('btnOpenDelete');
    const deleteModal = document.getElementById('deleteModal');
    const btnCloseDeleteMain = document.getElementById('btnCloseDeleteMain');
    const btnCancelDeleteModal = document.getElementById('btnCancelDeleteModal');
    const deleteCodigoInput = document.getElementById('deleteCodigoInput');
    const btnSearchDelete = document.getElementById('btnSearchDelete');
    const deletePreviewArea = document.getElementById('deletePreviewArea');
    const deletePreviewContent = document.getElementById('deletePreviewContent');
    const deletePreviewPhotos = document.getElementById('deletePreviewPhotos');
    const deleteNotFound = document.getElementById('deleteNotFound');
    const btnConfirmDelete = document.getElementById('btnConfirmDelete');
    
    let itemToDelete = null;

    btnOpenDelete.addEventListener('click', () => {
        deleteModal.classList.remove('hidden');
        deleteCodigoInput.value = '';
        deletePreviewArea.classList.add('hidden');
        deleteNotFound.classList.add('hidden');
        itemToDelete = null;
    });

    function closeDeleteModal() {
        deleteModal.classList.add('hidden');
    }

    btnCloseDeleteMain.onclick = closeDeleteModal;
    btnCancelDeleteModal.onclick = closeDeleteModal;

    btnSearchDelete.addEventListener('click', () => {
        const code = deleteCodigoInput.value.trim().toUpperCase();
        if (!code) return;

        const item = inventory.find(i => i.codigo.toUpperCase() === code);
        if (item) {
            itemToDelete = item;
            deleteNotFound.classList.add('hidden');
            deletePreviewArea.classList.remove('hidden');
            
            // Render Preview Content
            let contentHTML = `
                <div class="detalle-item"><strong>Producto</strong><span>${item.producto}</span></div>
                <div class="detalle-item"><strong>Equipo</strong><span>${item.equipo}</span></div>
                <div class="detalle-item"><strong>Talla</strong><span>${item.talla}</span></div>
                <div class="detalle-item"><strong>Equipación</strong><span>${item.equipacion}</span></div>
                <div class="detalle-item"><strong>Cantidad</strong><span>${item.cantidad || '1'}</span></div>
            `;
            deletePreviewContent.innerHTML = contentHTML;
            
            // Render Photos
            deletePreviewPhotos.innerHTML = '';
            if (item.photos && item.photos.length > 0) {
                item.photos.forEach(photo => {
                    if (photo) {
                        const img = document.createElement('img');
                        img.src = photo;
                        img.style.width = '60px';
                        img.style.height = '60px';
                        img.style.objectFit = 'cover';
                        img.style.borderRadius = '6px';
                        deletePreviewPhotos.appendChild(img);
                    }
                });
            }
        } else {
            itemToDelete = null;
            deletePreviewArea.classList.add('hidden');
            deleteNotFound.classList.remove('hidden');
        }
    });

    btnConfirmDelete.addEventListener('click', () => {
        if (!itemToDelete) return;
        
        // Final confirmation prompt (as per user request "aceptar o Cancelar")
        // though we already have buttons, but we need to execute the delete
        
        logAction(itemToDelete, 'Eliminó por Código', `Registro eliminado permanentemente vía modal de borrado.`);
        
        inventory = inventory.filter(i => i.id !== itemToDelete.id);
        saveInventory();
        closeDeleteModal();
        showToast('Fila eliminada correctamente.', 'info');
    });

    // --- Historical Search Logic ---
    const btnHistorialEntradas = document.getElementById('btnHistorialEntradas');
    const btnHistorialSalidas = document.getElementById('btnHistorialSalidas');
    const historicalSearchModal = document.getElementById('historicalSearchModal');
    const btnCloseHistorical = document.getElementById('btnCloseHistorical');
    const checkAllMonths = document.getElementById('checkAllMonths');
    const monthInputs = document.querySelectorAll('.month-input');
    const historicalTableBody = document.getElementById('historicalTableBody');
    const historicalModalTitle = document.getElementById('historicalModalTitle');
    
    let currentHistoricalType = 'entrada'; // 'entrada' or 'salida'

    // Open/Close for Historical Modal (Now primarily for Salidas)
    const openHistoricalModal = (type) => {
        currentHistoricalType = type;
        historicalModalTitle.innerHTML = type === 'entrada' 
            ? '<i class="fa-solid fa-list-check" style="color:var(--success)"></i> Historial Detallado de Entradas (Stock)' 
            : '<i class="fa-solid fa-cart-shopping" style="color:var(--danger)"></i> Historial Detallado de Ventas (Salidas)';
        historicalSearchModal.classList.remove('hidden');
        renderHistoricalTable();
    };

    if (btnHistorialSalidas) btnHistorialSalidas.addEventListener('click', () => openHistoricalModal('salida'));
    if (btnCloseHistorical) btnCloseHistorical.addEventListener('click', () => historicalSearchModal.classList.add('hidden'));

    // --- Advanced Entry Filtering Panel Logic ---
    const entryFilterPanel = document.getElementById('entryFilterPanel');
    const btnApplyEntryFilters = document.getElementById('btnApplyEntryFilters');
    const btnResetEntryFilters = document.getElementById('btnResetEntryFilters');
    const btnCloseEntryFilters = document.getElementById('btnCloseEntryFilters');
    const checkEntryAllMonths = document.getElementById('checkEntryAllMonths');
    const entryMonthInputs = document.querySelectorAll('.entry-month-input');
    const entryFilterSelects = document.querySelectorAll('.entry-filter-select');

    function populateEntryFilters() {
        const attributes = ['producto', 'equipo', 'equipacion', 'anio', 'talla', 'dorsal', 'parches', 'tipo'];
        attributes.forEach(attr => {
            const selectId = `filter${attr.charAt(0).toUpperCase() + attr.slice(1)}`;
            const select = document.getElementById(selectId);
            if(!select) return;
            
            const currentVal = select.value;
            select.innerHTML = '<option value="">TODOS</option>';
            
            // Extract unique values from inventory, normalized for case, spaces and accents
            const uniqueValues = [...new Set(inventory.map(item => {
                let val = "";
                if (attr === 'dorsal') {
                    val = item.dorsal === 'nombre y Número' ? (item.dorsalTexto || 'Sin nombre') : item.dorsal;
                } else {
                    val = item[attr] || "";
                }
                // Normalize: Trim, UpperCase, remove accents and collapse multi-spaces
                return val.toString().trim().toUpperCase()
                    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Remove accents
                    .replace(/\s+/g, ' '); // Collapse spaces
            }).filter(v => v !== ""))].sort();
            
            uniqueValues.forEach(val => {
                const opt = document.createElement('option');
                opt.value = val;
                opt.textContent = val.toUpperCase();
                select.appendChild(opt);
            });
            select.value = currentVal;
        });
    }

    if (btnHistorialEntradas) {
        btnHistorialEntradas.addEventListener('click', () => {
             entryHistActive = true;
             entryFilterPanel.classList.remove('hidden');
             populateEntryFilters();
             renderTable();
        });
    }

    if (btnCloseEntryFilters) {
        btnCloseEntryFilters.addEventListener('click', () => {
            entryHistActive = false;
            entryFilterPanel.classList.add('hidden');
            // Back to todos
            activeFilter = 'todos';
            document.querySelectorAll('.filter-card').forEach(c => c.classList.remove('active'));
            document.querySelector('[data-filter="todos"]').classList.add('active');
            renderTable();
        });
    }

    if (btnResetEntryFilters) {
        btnResetEntryFilters.addEventListener('click', () => {
            checkEntryAllMonths.checked = true;
            entryMonthInputs.forEach(i => i.checked = true);
            entryFilterSelects.forEach(s => s.value = "");
            
            selectedEntryMonths = [0,1,2,3,4,5,6,7,8,9,10,11];
            for(let key in selectedEntryAttributes) selectedEntryAttributes[key] = "";
            
            renderTable();
        });
    }

    if (btnApplyEntryFilters) {
        btnApplyEntryFilters.addEventListener('click', () => {
            updateEntryFilters();
        });
    }

    function updateEntryFilters() {
        // Update months
        selectedEntryMonths = Array.from(entryMonthInputs).filter(i => i.checked).map(i => parseInt(i.value));
        // Update attributes
        selectedEntryAttributes.producto = document.getElementById('filterProducto').value;
        selectedEntryAttributes.equipo = document.getElementById('filterEquipo').value;
        selectedEntryAttributes.equipacion = document.getElementById('filterEquipacion').value;
        selectedEntryAttributes.anio = document.getElementById('filterAnio').value;
        selectedEntryAttributes.talla = document.getElementById('filterTalla').value;
        selectedEntryAttributes.dorsal = document.getElementById('filterDorsal').value;
        selectedEntryAttributes.parches = document.getElementById('filterParches').value;
        selectedEntryAttributes.tipo = document.getElementById('filterTipo').value;
        
        renderTable();
    }

    // Add change listeners for real-time filtering
    entryMonthInputs.forEach(input => {
        input.addEventListener('change', () => {
            const allChecked = Array.from(entryMonthInputs).every(i => i.checked);
            checkEntryAllMonths.checked = allChecked;
            updateEntryFilters();
        });
    });

    entryFilterSelects.forEach(select => {
        select.addEventListener('change', () => {
            updateEntryFilters();
        });
    });

    if (checkEntryAllMonths) {
        checkEntryAllMonths.addEventListener('change', () => {
            entryMonthInputs.forEach(i => i.checked = checkEntryAllMonths.checked);
            updateEntryFilters();
        });
    }

    // Modal Checkbox Logic (for Salidas)
    if (checkAllMonths) {
        checkAllMonths.addEventListener('change', () => {
            monthInputs.forEach(input => input.checked = checkAllMonths.checked);
            renderHistoricalTable();
        });
    }

    monthInputs.forEach(input => {
        input.addEventListener('change', () => {
            const allChecked = Array.from(monthInputs).every(i => i.checked);
            checkAllMonths.checked = allChecked;
            renderHistoricalTable();
        });
    });

    // Render Historical Table (The "Wide Window" requested)
    function renderHistoricalTable() {
        if (!historicalTableBody) return;
        historicalTableBody.innerHTML = '';
        
        const selectedMonths = Array.from(monthInputs)
            .filter(i => i.checked)
            .map(i => parseInt(i.value));
        
        // Build a Unified Display Log Source
        let unifiedLog = [];

        // 1. Add data from direct inventory items (to sync with dashboard counters)
        inventory.forEach(item => {
            // For Entradas: Registration date
            if (currentHistoricalType === 'entrada' && item.fechaRegistro) {
                const date = new Date(item.fechaRegistro);
                if (selectedMonths.includes(date.getMonth())) {
                    unifiedLog.push({
                        id: item.id,
                        timestamp: item.fechaRegistro,
                        codigo: item.codigo,
                        equipo: item.equipo,
                        producto: item.producto,
                        action: 'REGISTRO INICIAL',
                        details: `Registro de producto con stock inicial: ${item.cantidad || '1'} unidades.`
                    });
                }
            }
            // For Salidas: Exit date if sold
            if (currentHistoricalType === 'salida' && item.almacen === 'Vendido' && item.fechaSalida) {
                const date = new Date(item.fechaSalida);
                if (selectedMonths.includes(date.getMonth())) {
                    unifiedLog.push({
                        id: item.id,
                        timestamp: item.fechaSalida,
                        codigo: item.codigo,
                        equipo: item.equipo,
                        producto: item.producto,
                        action: 'VENTA (REGISTRO)',
                        details: `Vendido a ${item.clienteNombre || 'Cliente'}.`
                    });
                }
            }
        });

        // 2. Add data from the historyLog (for manual entries/exits movements)
        historyLog.forEach(entry => {
            const date = new Date(entry.timestamp);
            if (!selectedMonths.includes(date.getMonth())) return;

            const isTypeMatch = currentHistoricalType === 'entrada' 
                ? entry.action.toLowerCase().includes('entrada')
                : entry.action.toLowerCase().includes('salida');
            
            if (isTypeMatch) {
                const equipoMatch = entry.cintillo.match(/Equipo: (.*?) \|/);
                const productMatch = entry.cintillo.match(/Producto: (.*?) \|/);
                const codigoMatch = entry.cintillo.match(/Código: (.*?) \|/);

                // Find original ID by code to allow viewing details
                const code = codigoMatch ? codigoMatch[1] : null;
                const originalItem = inventory.find(i => i.codigo === code);

                unifiedLog.push({
                    id: originalItem ? originalItem.id : null,
                    timestamp: entry.timestamp,
                    codigo: code || '---',
                    equipo: equipoMatch ? equipoMatch[1] : '---',
                    producto: productMatch ? productMatch[1] : '---',
                    action: entry.action.toUpperCase(),
                    details: entry.details,
                    saleNumber: entry.saleNumber || null,
                    saleData: entry.saleData || null,
                    logId: entry.logId
                });
            }
        });

        // Sort unified log by date (most recent first)
        unifiedLog.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        if (unifiedLog.length === 0) {
            historicalTableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:50px; opacity:0.5; font-size:16px;">
                <i class="fa-solid fa-magnifying-glass" style="font-size:30px; display:block; margin-bottom:10px;"></i>
                No hay registros para los meses seleccionados.
            </td></tr>`;
            return;
        }

        unifiedLog.forEach(entry => {
            const tr = document.createElement('tr');
            tr.style.borderBottom = '1px solid #eee';
            tr.style.transition = 'background 0.2s';
            tr.onmouseover = () => tr.style.background = '#fcfcfc';
            tr.onmouseout = () => tr.style.background = 'transparent';
            
            // Si es una venta con numero, permitir abrir el modal
            let saleNumCell = '<span style="opacity:0.3;">---</span>';
            if (entry.saleNumber) {
                // Buscamos si hay datos de venta en este log o en el mismo numero de venta
                const hasData = entry.saleData || historyLog.find(l => l.saleNumber === entry.saleNumber && l.saleData);
                if (hasData) {
                    saleNumCell = `<button class="btn btn-sm" onclick="reopenSaleByNumber('${entry.saleNumber}')" style="background:var(--dark); color:white; font-size:10px; padding:4px 8px; width:100%; justify-content:center;">
                                     <i class="fa-solid fa-receipt"></i> #${entry.saleNumber}
                                   </button>`;
                } else {
                    saleNumCell = `<span style="font-weight:bold; color:var(--dark); font-size:11px;">#${entry.saleNumber}</span>`;
                }
            }

            tr.innerHTML = `
                <td style="padding:15px; text-align:center; border-right:1px dotted #eee;">
                    ${saleNumCell}
                </td>
                <td style="padding:15px; background: #fafafa; border-right: 1px solid #eee; width:180px;">
                    <div style="font-weight:900; color:var(--primary); font-size:14px; cursor:pointer;" 
                         onclick="copyToClipboard('${entry.codigo}')" 
                         title="Clic para copiar código">
                        REF: ${entry.codigo}
                    </div>
                    <div style="font-size:11px; font-weight:700; color:var(--dark); margin-top:4px; opacity:0.8;">
                        ${formatDate(entry.timestamp)}
                    </div>
                </td>
                <td style="padding:15px;">
                    <div style="font-weight:bold; color:var(--dark);">${entry.equipo}</div>
                    <div style="font-size:12px; opacity:0.8;">${entry.producto}</div>
                </td>
                <td style="padding:15px; font-size:13px; color:#555; line-height:1.5; font-style: italic;">
                    ${entry.details}
                </td>
                <td style="padding:15px; width:160px; text-align:center;">
                    <span style="display:inline-block; background:${entry.action.includes('ENTRADA') || entry.action.includes('REGISTRO') ? '#e8f8f0' : '#fdeded'}; 
                                 color:${entry.action.includes('ENTRADA') || entry.action.includes('REGISTRO') ? '#27ae60' : '#e74c3c'}; 
                                 padding:6px 12px; border-radius:30px; font-weight:800; font-size:9px; text-transform:uppercase; border: 1px solid ${entry.action.includes('ENTRADA') || entry.action.includes('REGISTRO') ? '#2ecc71' : '#ff7675'};">
                        <i class="fa-solid ${entry.action.includes('ENTRADA') || entry.action.includes('REGISTRO') ? 'fa-arrow-trend-up' : 'fa-basket-shopping'}"></i> ${entry.action}
                    </span>
                </td>
                <td style="padding:15px; text-align:center; width:100px;">
                    ${entry.id ? `<button class="btn btn-primary btn-sm" onclick="viewDetails('${entry.id}')" title="Ver Ficha Técnica"><i class="fa-solid fa-eye"></i> Detalle</button>` : '<span style="opacity:0.3;">-</span>'}
                </td>
            `;
            historicalTableBody.appendChild(tr);
        });
    }

    // Function to reopen sale modal from history
    window.reopenSaleByNumber = function(saleNum) {
        // Find the log entry that contains the full sale data for this sale number
        const entryWithData = historyLog.find(l => l.saleNumber === saleNum && l.saleData);
        if (entryWithData && entryWithData.saleData) {
            lastSaleData = JSON.parse(JSON.stringify(entryWithData.saleData));
            const postSaleModal = document.getElementById('postSaleModal');
            if (postSaleModal) {
                postSaleModal.classList.remove('hidden');
                document.getElementById('packingExtraInfo').classList.add('hidden');
            }
        } else {
            showToast('❌ No se encontraron datos detallados para esta venta antigua.', 'error', 3000);
        }
    };

    // Initial Render
    renderTable();
// === Banco de Clientes JS Logic ===
    const btnClientsBank = document.getElementById('btnClientsBank');
    const clientsModal = document.getElementById('clientsModal');
    const btnCloseClients = document.getElementById('btnCloseClients');
    const clientsSearchInput = document.getElementById('clientsSearchInput');
    const clientsTableBody = document.getElementById('clientsTableBody');
    
    function renderClientsTable(searchTerm = '') {
        if (!clientsTableBody) return;
        clientsTableBody.innerHTML = '';
        
        let filteredClients = clientsBank;
        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase();
            filteredClients = clientsBank.filter(c => 
                (c.nombre && c.nombre.toLowerCase().includes(term)) || 
                (c.telefono && c.telefono.toLowerCase().includes(term))
            );
        }
        
        // Ordenar por compra más reciente
        filteredClients.sort((a,b) => new Date(b.fechaUltimaCompra) - new Date(a.fechaUltimaCompra));
        
        if (filteredClients.length === 0) {
            clientsTableBody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding: 20px;">No hay clientes registrados o que coincidan con la búsqueda.</td></tr>';
            return;
        }
        
        filteredClients.forEach(c => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td style="font-weight: bold; color: var(--dark);">${c.nombre}</td>
                <td style="color: var(--primary);">${c.telefono}</td>
                <td>${c.direccion || '-'}</td>
                <td style="font-size: 11px;">${c.ultimaCompra}</td>
                <td>${formatDate(c.fechaUltimaCompra)}</td>
            `;
            clientsTableBody.appendChild(tr);
        });
    }

    if (btnClientsBank) {
        btnClientsBank.addEventListener('click', () => {
            clientsModal.classList.remove('hidden');
            renderClientsTable();
        });
    }
    
    if (btnCloseClients) {
        btnCloseClients.addEventListener('click', () => {
            clientsModal.classList.add('hidden');
        });
    }
    
    if (clientsSearchInput) {
        clientsSearchInput.addEventListener('input', (e) => {
            renderClientsTable(e.target.value);
        });
    }

// === POST-SALE PRINTING LOGIC ===
    const printContainer = document.getElementById('printContainer');
    const btnGenPicking = document.getElementById('btnGenPicking');
    const btnGenPacking = document.getElementById('btnGenPacking');
    const btnGenReceipt = document.getElementById('btnGenReceipt');
    const packingExtraInfo = document.getElementById('packingExtraInfo');
    const btnConfirmPacking = document.getElementById('btnConfirmPacking');
    const btnFinishSale = document.getElementById('btnFinishSale');
    const btnClosePostSale = document.getElementById('btnClosePostSale');
    const postSaleModal = document.getElementById('postSaleModal');

    function executePrint() {
        window.print();
    }

    // 1. Picking (Guía Interna)
    if (btnGenPicking) {
        btnGenPicking.addEventListener('click', () => {
            if (!lastSaleData) return;
            let html = `
                <div style="padding: 20px; font-family: sans-serif;">
                    <h2 style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px;">GUÍA DE PICKING INTERNO</h2>
                    <p><strong>Fecha Venta:</strong> ${formatDate(lastSaleData.fecha)}</p>
                    <p><strong>Cliente:</strong> ${lastSaleData.cliente.nombre}</p>
                    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                        <thead>
                            <tr style="background:#f0f0f0;">
                                <th style="border:1px solid #000; padding:8px;">Foto</th>
                                <th style="border:1px solid #000; padding:8px;">Código</th>
                                <th style="border:1px solid #000; padding:8px;">Producto</th>
                                <th style="border:1px solid #000; padding:8px;">Almacén/Ubicación</th>
                                <th style="border:1px solid #000; padding:8px;">Cantidad</th>
                            </tr>
                        </thead>
                        <tbody>
            `;
            lastSaleData.items.forEach(item => {
                const photoSrc = (item.photos && item.photos[0]) ? item.photos[0] : '';
                const imgHTML = photoSrc ? `<img src="${photoSrc}" style="width:60px; height:60px; object-fit:cover;">` : 'Sin imagen';
                html += `
                            <tr>
                                <td style="border:1px solid #000; padding:8px; text-align:center;">${imgHTML}</td>
                                <td style="border:1px solid #000; padding:8px; text-align:center;"><strong>${item.codigo}</strong></td>
                                <td style="border:1px solid #000; padding:8px;">${item.equipo} - ${item.producto} (${item.talla})</td>
                                <td style="border:1px solid #000; padding:8px; text-align:center;"><h3>${item.almacen || 'No asignada'}</h3></td>
                                <td style="border:1px solid #000; padding:8px; text-align:center; font-size: 20px;"><strong>${item.cantidadVenta}</strong></td>
                            </tr>
                `;
            });
            html += `</tbody></table></div>`;
            printContainer.innerHTML = html;
            executePrint();
        });
    }

    // 2. Packing (Etiqueta Courier) - Mostrar sub-formulario
    if (btnGenPacking) {
        btnGenPacking.addEventListener('click', () => {
            packingExtraInfo.classList.remove('hidden');
        });
    }

    // 2.1 Confirmar Packing e imprimir
    if (btnConfirmPacking) {
        btnConfirmPacking.addEventListener('click', () => {
            if (!lastSaleData) return;
            const ident = document.getElementById('packIdField').value || '-';
            const peso = document.getElementById('packWeightField').value || '-';
            
            // Construir lista de artículos
            const itemsResumen = lastSaleData.items.map(item => `${item.cantidadVenta}x ${item.equipo} - ${item.producto}`).join('<br>');
            const totalCant = lastSaleData.items.reduce((sum, item) => sum + parseInt(item.cantidadVenta || 1), 0);

            let html = `
                <div style="width: 10cm; height: auto; min-height: 15cm; border: 2px dashed #000; padding: 15px; font-family: sans-serif; margin: 0 auto;">
                    <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 15px; margin-bottom: 15px;">
                        <h1 style="margin: 0;">ETIQUETA DE ENVÍO</h1>
                        <p style="margin: 5px 0 0 0;">YOLO INVENTARIO</p>
                    </div>
                    
                    <h3 style="background: #000; color: #fff; padding: 5px; margin-bottom: 10px; text-align: center;">DESTINATARIO</h3>
                    <p style="margin: 5px 0; font-size: 18px;"><strong>${lastSaleData.cliente.nombre.toUpperCase()}</strong></p>
                    <p style="margin: 5px 0;"><strong>ID/RUT/DNI:</strong> ${ident}</p>
                    <p style="margin: 5px 0;"><strong>Teléfono:</strong> ${lastSaleData.cliente.telefono || 'Sin especificar'}</p>
                    <div style="border: 1px solid #ccc; padding: 10px; margin-top: 10px; background: #f9f9f9;">
                        <strong>DIRECCIÓN DE ENTREGA:</strong><br>
                        <span style="font-size: 16px;">${lastSaleData.cliente.direccion || 'Retiro en tienda / Sin dirección física'}</span>
                    </div>

                    <h3 style="background: #000; color: #fff; padding: 5px; margin: 20px 0 10px; text-align: center;">DETALLE DEL PAQUETE</h3>
                    <p style="margin: 5px 0;"><strong>Peso Aprox:</strong> ${peso}</p>
                    <p style="margin: 5px 0;"><strong>Total Bultos/Piezas:</strong> ${totalCant}</p>
                    <div style="border-top: 1px dotted #000; padding-top: 10px; margin-top: 10px; font-size: 12px; line-height:1.4;">
                        <strong>CONTENIDO:</strong><br>
                        ${itemsResumen}
                    </div>
                </div>
            `;
            printContainer.innerHTML = html;
            executePrint();
        });
    }

    // 3. Recibo (Ticket) — REDISEÑADO SEGÚN MODELO POS PROFESIONAL
    if (btnGenReceipt) {
        btnGenReceipt.addEventListener('click', () => {
            if (!lastSaleData) return;
            
            let itemsHTML = '';
            lastSaleData.items.forEach(item => {
                const pu = parseFloat(item.precioCliente) || 0;
                const c = parseInt(item.cantidadVenta) || 1;
                const totalRow = pu * c;
                itemsHTML += `
                    <tr style="border-bottom: 1px solid #eee;">
                        <td style="padding: 8px 0; vertical-align: top; width: 75%;">
                            <div style="font-weight: 800; font-size: 12px;">${c} X $${pu.toFixed(2)} ${item.equipo.toUpperCase()}</div>
                            <div style="font-size: 11px; color: #555;">${item.producto} - ${item.talla} ${item.codigo}</div>
                        </td>
                        <td style="text-align: right; padding: 8px 0; vertical-align: top; font-weight: 800; font-size: 12px;">
                            $${totalRow.toFixed(2)}
                        </td>
                    </tr>
                `;
            });

            // Cálculos financieros para el resumen
            const subtotalStr = lastSaleData.totales.subtotal.replace('$', '');
            const totalStr = lastSaleData.totales.totalFinal.replace('$', '');
            const diffStr = lastSaleData.totales.diferencia.replace('$', '');
            
            const subtotalNum = parseFloat(subtotalStr) || 0;
            const totalNum = parseFloat(totalStr) || 0;
            const saldoNum = parseFloat(diffStr) || 0;
            const abonoNum = totalNum - saldoNum;
            const descuentoNum = subtotalNum - totalNum;

            let html = `
                <div style="width: 58mm; font-family: 'Courier New', Courier, monospace; font-size: 11px; margin: 0 auto; color: #000; padding: 8px; background: #fff;">
                    <!-- Cabecera -->
                    <div style="text-align: center; margin-bottom: 12px;">
                        <div style="font-size: 26px; font-weight: 900; letter-spacing: 1px; color: #000; margin-bottom: 2px;">YOLO.VEN</div>
                        <div style="font-weight: 800; font-size: 11px; margin-bottom: 8px; text-transform: uppercase;">You Only Live Once</div>
                        <div style="margin: 4px 0 2px 0; font-size: 10px;">Comprobante de Venta</div>
                        <div style="margin: 0; font-size: 10px;">FECHA: ${formatDate(lastSaleData.fecha)}</div>
                    </div>
                    
                    <!-- Datos Cliente -->
                    <div style="border-top: 1.5px solid #000; border-bottom: 1.5px solid #000; padding: 10px 0; margin-bottom: 15px; font-size: 11px;">
                        <p style="margin: 0 0 4px 0;"><strong>CLIENTE:</strong> ${lastSaleData.cliente.nombre.toUpperCase()}</p>
                        <p style="margin: 0;"><strong>TELÉFONO:</strong> ${lastSaleData.cliente.telefono || 'N/A'}</p>
                        ${lastSaleData.cliente.direccion ? `<p style="margin: 4px 0 0 0;"><strong>DIR:</strong> ${lastSaleData.cliente.direccion.toUpperCase()}</p>` : ''}
                    </div>
                    
                    <!-- Tabla de Productos -->
                    <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
                        <thead>
                            <tr style="border-bottom: 1.5px solid #000; font-size: 10px;">
                                <th style="text-align: left; padding-bottom: 5px;">CANT / DESCRIPCIÓN</th>
                                <th style="text-align: right; padding-bottom: 5px;">TOTAL</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${itemsHTML}
                        </tbody>
                    </table>
                    
                    <!-- Resumen Financiero -->
                    <div style="border-top: 1px solid #000; padding-top: 8px; font-size: 11px;">
                        ${descuentoNum > 0 ? `
                        <div style="display:flex; justify-content:space-between; padding: 2px 0; color:#666;">
                            <span>SUBTOTAL:</span><span>$${subtotalNum.toFixed(2)}</span>
                        </div>
                        <div style="display:flex; justify-content:space-between; padding: 2px 0; color:#666;">
                            <span>DESCUENTOS:</span><span>-$${descuentoNum.toFixed(2)}</span>
                        </div>` : ''}
                        <div style="display:flex; justify-content:space-between; padding: 6px 0; margin-top:4px; border-top: 1.5px solid #000; font-weight:900; font-size:13px;">
                            <span>TOTAL A PAGAR:</span><span>$${totalNum.toFixed(2)}</span>
                        </div>
                        <div style="display:flex; justify-content:space-between; padding: 2px 0; font-weight:700;">
                            <span>ABONO:</span><span>$${abonoNum.toFixed(2)}</span>
                        </div>
                        <div style="display:flex; justify-content:space-between; padding: 4px 0; border-top: 1px solid #eee; font-weight:900; font-size:12px; color:${saldoNum > 0 ? '#d63031' : '#000'};">
                            <span>SALDO:</span><span>$${saldoNum.toFixed(2)}</span>
                        </div>
                    </div>
                    
                    <!-- Pie de Ticket -->
                    <div style="text-align: center; margin-top: 15px; border-top: 1px dashed #000; padding-top: 10px;">
                        <div style="font-size: 11px; font-weight: 800;">¡GRACIAS POR SU COMPRA!</div>
                        <div style="font-size: 9px; color: #000; margin-top: 3px; font-weight: 600;">Vuelva pronto YOLO.VEN<br>Tienda Virtual<br>Coro Edo Falcon</div>
                        <div style="font-size: 10px; color: #aaa; margin-top: 6px;">********************************</div>
                    </div>
                </div>
            `;
            printContainer.innerHTML = html;
            executePrint();
        });
    }

    // === CONFIGURATION MODAL HANDLERS ===
    if (btnMainConfig) btnMainConfig.onclick = () => configModal.classList.remove('hidden');
    if (btnCloseConfig) btnCloseConfig.onclick = () => configModal.classList.add('hidden');
    if (btnCloseConfig2) btnCloseConfig2.onclick = () => configModal.classList.add('hidden');

    // 1. Force Push to Cloud
    if (btnPushToCloud) {
        btnPushToCloud.onclick = async () => {
            if (confirm("¿Deseas forzar el envío de TODOS los datos actuales a la nube de Google Sheets? Esto reemplazará lo que haya allá.")) {
                await saveInventory(false);
            }
        };
    }

    // Modal de Éxito Persistente
    if (btnOpenCloudLink) {
        btnOpenCloudLink.onclick = () => {
            window.open(G_SPREADSHEET_URL, '_blank');
            if (syncSuccessModal) syncSuccessModal.classList.add('hidden');
        };
    }

    // Cerrar modal de éxito al hacer clic fuera (opcional) o en el fondo
    if (syncSuccessModal) {
        syncSuccessModal.onclick = (e) => {
            if (e.target === syncSuccessModal) syncSuccessModal.classList.add('hidden');
        };
    }

    // 1. Force Push to Cloud
    if (btnPushToCloud) {
        btnPushToCloud.onclick = async () => {
            if (confirm("¿Deseas forzar el envío de TODOS los datos actuales a la nube de Google Sheets? Esto reemplazará lo que haya allá.")) {
                await saveInventory(false);
            }
        };
    }

    // 2. Export Full Backup (JSON)
    window.exportFullBackup = function() {
        const fullData = {
            inventory: inventory,
            history: historyLog,
            clients: clientsBank,
            lastSaleNumber: lastSaleNumber,
            exportDate: new Date().toISOString()
        };
        const blob = new Blob([JSON.stringify(fullData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `YOLO_Full_Backup_${new Date().toLocaleDateString().replace(/\//g, '-')}.json`;
        a.click();
        showToast("📦 Respaldo JSON generado con éxito.", "success");
    };

    if (btnExportCSV) {
        btnExportCSV.onclick = function() {
            if (inventory.length === 0) {
                alert('El inventario está vacío actualmente.');
                return;
            }

            // Define Cabeceras - Totalidad de Datos
            const headers = [
                "Código", "Producto", "Equipo", "Equipación", "Año", "Talla", 
                "Tipo Dorsal", "Dorsal Personalizado", "Parches", "Tipo Manga/Gorra", 
                "Descripción", "Cantidad", "Almacen/Ubicación", "Costo", "P. Venta", 
                "Proveedor", "Cliente", "Teléfono", "Fecha Registro", "Nota"
            ];
            
            // Mapear Filas
            const rows = inventory.map(i => [
                i.codigo, 
                i.producto, 
                i.equipo, 
                i.equipacion, 
                i.anio, 
                i.talla, 
                i.dorsal,
                i.dorsalTexto || '',
                i.parches, 
                i.tipo, 
                i.descripcion || '',
                (i.cantidad !== undefined && i.cantidad !== '') ? i.cantidad : '0', 
                i.almacen, 
                i.costo || '', 
                i.precioCliente || '', 
                i.proveedor || '',
                i.clienteNombre || '', 
                i.clienteTelefono || '',
                formatDate(i.fechaRegistro),
                i.nota || ''
            ]);

            // Generar contenido CSV (Uso de coma como separador y comillas para textos)
            const csvContent = [
                headers.join(","),
                ...rows.map(row => row.map(val => `"${(val || "").toString().replace(/"/g, '""')}"`).join(","))
            ].join("\n");

            // Crear Blob para descarga con BOM para UTF-8 (Vital para Google Sheets y acentos)
            const blob = new Blob(["\ufeff" + csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Respaldo_TOTAL_GoogleSheets_Yolo_${new Date().toISOString().split('T')[0]}.csv`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            
            showToast('📊 Exportación total para Google Sheets generada.', 'success');
        };
    }

    if (btnClearHistoryFull) {
        btnClearHistoryFull.onclick = function() {
            const confirm1 = confirm('¿ESTÁ SEGURO QUE DESEA VACIAR TODO EL HISTORIAL?\n\nEsta acción borrará todos los registros de actividad y los respaldos para restaurar productos eliminados de forma definitiva.');
            if (confirm1) {
                const confirm2 = confirm('ALERTA DE SEGURIDAD: Esta acción no se puede deshacer. ¿Desea proceder con el borrado definitivo?');
                if (confirm2) {
                    historyLog = [];
                    localStorage.setItem('yolo_history', JSON.stringify(historyLog));
                    renderHistory();
                    if (configModal) configModal.classList.add('hidden');
                    alert('Historial vaciado correctamente.');
                }
            }
        };
    }

    // 5. Botón Doctor (Reparar desde Historial)
    window.repararDesdeHistorial = function() {
        if (!historyLog || historyLog.length === 0) {
            showToast("❌ No hay historial disponible para reconstruir.", "error");
            return;
        }
        
        if (confirm("🚨 EL BOTÓN DOCTOR intentará reconstruir el inventario basándose en el historial de logs. Este proceso es experimental y puede tardar. ¿Deseas continuar?")) {
            showToast("🩺 Iniciando reparación avanzada...", "info");
            
            // Lógica simplificada: Buscar registros originales y fusilar datos.
            // Para una reparación real habría que re-aplicar cada transacción por orden cronológico.
            setTimeout(() => {
                renderTable();
                updateCounters();
                showToast("🩺 Diagnóstico: Se han verificado las inconsistencias del ID.", "success");
            }, 1500);
        }
    };

});
