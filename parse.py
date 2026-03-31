import json
import random
import string

data = """DE NIÑO VENEZUELA Vinotinto 24/25 LOCAL - Talla 8  - SIN DORSAL  - COPA AMERICA 2024	8			M CORTA	CAMISETA
AL NASSR AMARILLA 24/25 LOCAL - Talla L- CRISTIANO RONALDO #7 - SIN PARCHE	L			M CORTA	CAMISETA
AL NASSR AZUL MARINO 24/25 VISITANTE - Talla S - CRISTIANO RONALDO #7-	S			M CORTA	CAMISETA
AL NASSR AZUL MARINO 24/25 VISITANTE - Talla XL - CRISTIANO RONALDO #7 -	XL			M CORTA	CAMISETA
ATLETICO MADRID ARANA 24/25 LOCAL - Talla L - JULIAN ALVAREZ #19 - LA LIGA	L			M CORTA	CAMISETA
ATLETICO MADRID ARANA 24/25 LOCAL ESP - Talla S - JULIAN ALVAREZ #19 - LA LIGA	S			M CORTA	CAMISETA
BARCELONA 2025 125 ANIVERSARIO - Talla S-SIN DORSAL	S			M CORTA	CAMISETA
BARCELONA 25/26 LOCAL - Talla L- YAMAL 10	L			M CORTA	CAMISETA
BARCELONA KOBE 25/26 - Talla L- YAMAL #10	L			M CORTA	CAMISETA
BARCELONA KOBE 25/26 - Talla M - PEDRI #8	M			M CORTA	CAMISETA
BARCELONA NEGRA 24/25 VISITANTE - Talla XL - LAMINE YAMAL #19 - CHAMPIONS	XL			M CORTA	CAMISETA
BARCELONA ROJA Y AZUL 24/25 LOCAL - Talla L- RAPHINA #11 -CHAMPIONS	L			M CORTA	CAMISETA
BARCELONA ROJA Y AZUL 24/25 LOCAL - Talla XL - LAMINE YAMAL #19 - LA LIGA	XL			M CORTA	CAMISETA
BARCELONA ROJAY AZUL 24/25 LOCAL - Talla S- LAMINE YAMAL #19 - CHAMPIONS	S			M CORTA	CAMISETA
INTER MIAMI 25/26 VISITANTE. - Talla S- MESSI #10 - MLS	S			M CORTA	CAMISETA
INTER MIAMI VERDE 24/25 ALTERNA - Talla M- MESSI #10- MLS	M			M CORTA	CAMISETA
INTER MIAMI VERDE 24/25 ALTERNA - Talla S - MESSI#10- MLS	S			M CORTA	CAMISETA
INTER MIAMI VERDE 24/25 ALTERNA - Talla XL - MESSI #10 - MLS	XL			M CORTA	CAMISETA
MANCHESTER CITY AZUL 24/25 LOCAL - Talla L- HAALAND #9 - CHAMPIONS	L			M CORTA	CAMISETA
MANCHESTER UNITED 07/08 LOCAL ROJA RETRO CR7 - Talla XL - CRISTIANO RONALDO #7- CHAMPION	XL			M CORTA	CAMISETA
REAL MADRID 25/26 MANGA LARGA CHAMPIONS - Talla L - BELLINGHANDCHAMPIOS	L			MANGA LARGA	CAMISETA
REAL MADRID AZUL REY 25/26 ALTERNA - Talla M - MASTANTUONO #30 - CHAMPIONS	M			M CORTA	CAMISETA
REAL MADRID BEISBOL 25/26 - Talla L -SIN DORSAL	L			M CORTA	CAMISETA
REAL MADRID BEISBOL 25/26 - Talla M- SIN DORSAL	M			M CORTA	CAMISETA
REAL MADRID BEISBOL 25/26 - Talla XL - REAL MADRID	XL			M CORTA	CAMISETA
REAL MADRID BLANCA 24/25 LOCAL - Talla L- MBAPPE #9 - CHAMPIONS	L			M CORTA	CAMISETA
REAL MADRID BLANCA 24/25 LOCAL - Talla M - BELLINGHAM #5 - CHAMPIONS	M			M CORTA	CAMISETA
REAL MADRID BLANCA 24/25 LOCAL - Talla M - MBAPPE #9 - CHAMPIONS	M			M CORTA	CAMISETA
REAL MADRID BLANCA 24/25 LOCAL - Talla XL - MBAPPE #9 - CHAMPIONS	XL			M CORTA	CAMISETA
REAL MADRID NARANJA 24/25 VISITANTE - Talla M - BELLINGHAM #5 - CHAMPIONS	M			M CORTA	CAMISETA
REAL MADRID NARANJA 24/25 VISITANTE - Talla XL - MBAPPE #9 - CHAMPIONS	XL			M CORTA	CAMISETA
REAL MADRID VISITANTE 25/26 - Talla M- MBAPPE #10 	M			M CORTA	CAMISETA
REAL MADRID VISITANTE 25/26 - Talla M- VALVERDE 8  - CHAMPIONS	M			M CORTA	CAMISETA
REAL MADRID VISITANTE 25/26 - Talla S- VALVERDE 8  - CHAMPIONS	S			M CORTA	CAMISETA
REAL SOCIEDAD VISITANTE DORADA, - Talla M- ARAMBURU #19LA LIGA	M			M CORTA	CAMISETA
VENEZUELA Blanca 24/25 VISITANTE - Talla L- RONDON #23 - SIN PARCHES	L			M CORTA	CAMISETA
VENEZUELA Blanca 24/25 VISITANTE - Talla L- SOTELDO #10- SIN PARCHES	L			M CORTA	CAMISETA
VENEZUELA Blanca 24/25 VISITANTE - Talla M - SOTELDO #10 - SIN PARCHES	M			M CORTA	CAMISETA
VENEZUELA Blanca 24/25 VISITANTE - Talla M- RONDON #23 - SIN PARCHES	M			M CORTA	CAMISETA"""

lines = data.split('\n')
parsed = []

def gen_code():
    return 'YOLO-' + ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))

for i, line in enumerate(lines):
    if not line.strip(): continue
    parts = line.split('\t')
    first_chunk = parts[0]
    
    talla = parts[1].strip() if len(parts) > 1 and parts[1].strip() else ""
    tipo = "Manga corta"
    if "MANGA LARGA" in line: tipo = "manga larga"
        
    producto = "camiseta de fútbol"
    if "BEISBOL" in line: producto = "camiseta de béisbol"
    elif "NBA" in line: producto = "camiseta NBA"
    
    desc_parts = [p.strip() for p in first_chunk.split('- ')]
    
    descripcion = desc_parts[0]
    equipo = desc_parts[0].split(' ')[0]
    if "REAL MADRID" in first_chunk: equipo = "REAL MADRID"
    elif "BARCELONA" in first_chunk: equipo = "BARCELONA"
    elif "INTER MIAMI" in first_chunk: equipo = "INTER MIAMI"
    elif "ATLETICO MADRID" in first_chunk: equipo = "ATLETICO MADRID"
    elif "MANCHESTER CITY" in first_chunk: equipo = "MANCHESTER CITY"
    elif "MANCHESTER UNITED" in first_chunk: equipo = "MANCHESTER UNITED"
    elif "AL NASSR" in first_chunk: equipo = "AL NASSR"
    elif "REAL SOCIEDAD" in first_chunk: equipo = "REAL SOCIEDAD"
    elif "VENEZUELA" in first_chunk: equipo = "VENEZUELA"
        
    equipacion = "Local"
    if "VISITANTE" in first_chunk: equipacion = "Visitante"
    elif "ALTERNA" in first_chunk: equipacion = "Alterna"
    elif "RETRO" in first_chunk: equipacion = "Retro"
        
    dorsal = "nombre y Número"
    if "SIN DORSAL" in first_chunk: dorsal = "Sin dorsal"
        
    parches = ""
    for d in desc_parts:
        if "CHAMPIONS" in d or "LA LIGA" in d or "MLS" in d or "COPA AMERICA" in d: parches = d
        if "SIN PARCHE" in d: parches = "Sin parches"
            
    if not talla:
        for d in desc_parts:
            if d.startswith("Talla"): talla = d.replace("Talla", "").strip()
            
    parsed.append({
        "id": str(1711100000000 + i),
        "codigo": gen_code(),
        "photos": [],
        "producto": producto,
        "equipo": equipo,
        "equipacion": equipacion,
        "anio": "2024",
        "talla": talla,
        "dorsal": dorsal,
        "parches": parches,
        "tipo": tipo,
        "descripcion": descripcion,
        "almacen": "Pendiente",
        "nota": line.strip()
    })

print(json.dumps(parsed, ensure_ascii=False, indent=2))
