import { usePlayers } from "./context/PlayerContext"

export function ElementsArray(){
   
    const {players} = usePlayers()
    const elements = [{title:'historia',content:'sadsadasdasdasdas'},
        {title:'Dirigencia',dirigentes:[
            {nombre:'Hugo Omar Fischer', cargo:'Presidente',dni:'16.019.619'},
            {nombre:'Abel Ernesto Ranni', cargo:'Vicepresidente',dni:'8.311.781'},
            {nombre:'Agustín Pandini', cargo:'Secretario',dni:'34.501.787'},
            {nombre:'María de las Mercedes Gómez Caviglia', cargo:'Prosecretaria',dni:'22.678.090'},
            {nombre:'Germán Lautaro Sampaoli', cargo:'Tesorero',dni:'43.464.230'},
            {nombre:'Juan Manuel Rodríguez ', cargo:'Pro Tesorero',dni:'42.430.762'},
            {nombre:'Andrés Demian Stanek', cargo:'Vocal 1°',dni:'22.419.822'},
            {nombre:'Rubén Darío Maidana', cargo:'Vocal 2°',dni:'24.428.647'},
            {nombre:'Esteban Salomón', cargo:'Vocal 1° Suplente',dni:'35.130.038'},
            {nombre:'Maximiliano Néstor Fabián Cavalleri', cargo:'Vocal 2 Suplente°',dni:'32.643.561'},
            {nombre:'Gabriel Horacio Iglesias', cargo:'Revisor de Cuentas',dni:'10.159.820'},
            {nombre:'Gregorio Omar Navarro Madrid', cargo:'Revisor de Cuentas',dni:'92.720.893'},
            {nombre:'Hugo Adalberto Catanzaro ', cargo:'Revisor de Cuentas',dni:'10.159.641'},
            {nombre:'Pedro Oscar Orellana', cargo:'Revisor de Cuentas Suplente',dni:'16.585.790'}
            
        ]},
        {title:'Estatuto FAO'},
        {title:'Reglamento FAO'},
        {title:'Entidades afiliadas',entidades:[
            {nombre:'Club Atlético Estudiantes', direccion:'Av. del Valle y Lavalle, B7400 Olavarría, Provincia de Buenos Aires', redes:['https://www.caeolavarria.com','https://web.facebook.com/caeolavarria','https://www.instagram.com/estudiantesolavarria'], img:'./logos/Estudiantes_olavarria_logo.png'},
            {nombre:'Racing Atletic Club', direccion:'Av. Colón 2301, B7400 Olavarría, Provincia de Buenos Aires', redes:['https://web.facebook.com/RacingAtleticClub','https://www.instagram.com/racingatleticclub'],img:'./logos/Escudo_del_Club_Racing_de_Olavarria_-_BSAS.svg'},
            {nombre:'Fútbol Club Ferro Carril Sud', direccion:'Av. Pringles 1851, B7400 Olavarría, Provincia de Buenos Aires', redes:['https://web.facebook.com/ClubFerroDeOlavarria','https://www.instagram.com/clubferrodeolavarria'],img:'./logos/ferro.webp'},
            {nombre:'Club San Martin de Sierras Bayas', direccion:'Av. Gral. José de San Martín, B7403 Sierras Bayas, Provincia de Buenos Aires', redes:['https://web.facebook.com/club.sanmartin.12'],img:'./logos/sanmartin.jpg'},
            {nombre:'Sociedad de Fomento Pueblo Nuevo', direccion:'Maipú 2848, B7400 Olavarría, Provincia de Buenos Aires',redes:[], img:'./logos/fomento.jpg'},
            {nombre:'Biblioteca Popular "Héctor Nicolás Amoroso"', direccion:'Deán Funes 3345, B7400 Olavarría, Provincia de Buenos Aires',redes:[], img:'./logos/biblioteca-amoroso.jpg'}
        ]},
        {title:'Sede FAO'},
        {title:'Listado de clubes', players:players, 
            clubes:[
                {nombre:'Racing', img:'./logos/Escudo_del_Club_Racing_de_Olavarria_-_BSAS.svg'},
                {nombre:'Ferro', img:'./logos/ferro.webp'},
                {nombre:'Estudiantes', img:'./logos/Estudiantes_olavarria_logo.png'},
                {nombre:'San Martín de Sierras Bayas', img:'./logos/sanmartin.jpg'},
                {nombre:'Amoroso', img:'./logos/biblioteca-amoroso.jpg'},
                {nombre:'Sociedad de Fomento Pueblo Nuevo', img:'./logos/fomento.jpg'},


            ]
        },
        {title:'Rating', players:players}
      ]

      return{elements}
}