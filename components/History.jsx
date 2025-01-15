
import { Container, Row, Col, Image } from "react-bootstrap";
import './History.css';

export default function History() {
    return (
        <Container className="history-container">
            <Row>
                <Col>
                    <h2 className="history-title">Nuestra historia</h2>
                    <p className="history-text">
                        (Extractado de la Biblioteca Mundial Deportiva, creada por el periodista Oscar H. Guffanti, Loma Negra, Olavarria), 07/99
                    </p>
                    <p className="history-text">
                        Fueron las confiterías las que cobijaron a quienes cultivaban el ajedrez en Olavarria, después de 1920. En sus tardes o noches, según las épocas, los amigos se reunían en el café para despuntar el vicio y así se fue difundiendo el juego ciencia.
                        Pero hubo un hecho que mucho ayudó para que el ajedrez tomara mayor fuerza, fue el enfrentamiento que por 1927 realizaron por la disputa del título mundial los grandes maestros internacionales, el rusofrancés Alejandro Alekhine y el cubano José Raúl Capablanca, en Buenos Aires. Los aficionados siguieron atentamente tan apasionante enfrentamiento y se adentraron más en aquello de conocer más y mejor aperturas, desarrollos, variantes y finales.
                        Pero para Olavarria, las reiteradas visitas que cumpliera más adelante el gran maestro -que fuera varias veces Campeón Argentino y capacitado periodista especializado-, Roberto M. Grau, desaparecido prematuramente, tuvieron capital importancia.
                        Fue así que no extrañó que por 1930, por decisión de un grupo de aquellos apasionados del ajedrez, fuera creado el Circulo de Ajedrez, que comenzó programando competencias locales.
                    </p>

                    <h4 className="history-subtitle">Primeras confrontaciones</h4>
                    <p className="history-text">
                        Pero con el fin de medir las posibilidades del juego de los olavarrienses se programaron las primeras confrontaciones con entidades de ciudades vecinas. Primero se jugó contra Azul y luego ante Tandil.
                        Los resultados logrados estimularon a dirigentes y jugadores y un año después de lo mencionado, en 1931, se enfrentó, en partido y revancha, con Bahía Blanca.
                        Todo esto fue llevado a cabo por el flamante Circulo de Ajedrez, cuya actividad la desplegaba en dependencias del Club Social, agrupación que luego por inercia de sus dirigentes, tendió a desaparecer.
                    </p>

                    <h4 className="history-subtitle">Ferrocarril Sud los cobija</h4>
                    <p className="history-text">
                        Los jugadores vieron derrumbarse sus esperanzas de seguir una actividad organizada. Por aquella causa, debieron volver al café. Un núcleo de Jugadores, alentados por amigos, se acercaron a un modesto club -por aquel entonces-, donde quienes así lo hicieron encontraron la comprensión y el desinterés de sus dirigentes. Fue así que dos directivos del Foot Ball Club Ferro Carril Sud -la entidad en cuestión-, los señores Domingo F. Colasurdo y Carlos Boscacci les brindaron todo su apoyo y al mismo tiempo pusieron al servicio de los ajedrecistas, una sala, ubicada en la primitiva sede de la calle Necochea.
                    </p>

                    <div className="history-image-container">
                        <Image fluid className="history-image" src="./historia/historia-1.jpg" alt="Los jóvenes aficionados a los trebejos se reunían durante las noches en el mítico salón del Club Ferro Carril Sud de la calle Necochea." />
                        <p className="history-image-caption">Los jóvenes aficionados a los trebejos se reunían durante las noches en el mítico salón del Club Ferro Carril Sud de la calle Necochea.</p>
                    </div>

                    <p className="history-text">
                        Tanto D. Domingo Colasurdo como D. Carlos Boscacci, al par que exponían sus cristalinas virtudes de excelentes directivos, se transformaron en los visionarios para un juego que con el correr del tiempo le habría de ofrecer a la entidad ferroviaria un sinnúrnero de satisfacciones.
                        Pero no es posible, en este momento de las evocaciones, echar un manto de olvido entre quienes fueron los principales gestores de que la entidad del riel incorporara a sus actividades el juego ciencia. Recordemos los nombres de los señores Melchor Vilanova, Renato Sabattini, Nito Pepa, Sebastián Hurtado, Dante A. Brun, Alfredo Bologna, Alfredo Sosa, Aurelio Pologna y otros más.
                        Este apoyo sirvió de estímulo para que quienes practicaban el trebejismo trabajaran con tesón en pro de la mayor difusión del juego y fue así que los más capacitados del grupo comenzaron a dictar en la entidad albiceleste clases de enseñanza y, posteriormente, se programaban los primeros concursos internos, por categorías.
                        Volvieron a cumplimentarse enfrentamientos con entidades amigas de la región y en 1936 marca todo un suceso la realización de un torneo individual en el que además de intervenir los más destacados cultores locales, fueron invitados a jugar los maestros Benito H. Villegas y Juan Iliesco.
                        Para estimular todo ese entusiasmo, los dirigentes ferroviarios no escatimaron esfuerzo alguno y de esa manera comienzan a desfilar por la vieja sede de la calle Necochea, realizando sesiones de simultáneas, consagrados maestros tales como Jacobo Balbochán, Virgilio Fenoglio, Benito H. Villegas, Juan Illesco, Julio A. Lynch, Miguel Najdorf, Gedeón Stahlberg y otros.
                    </p>

                    <div className="history-image-container">
                        <Image fluid className="history-image" src="/historia/historia-2.jpg" alt="Don Miguel Najdorf brindando partidas simultáneas a los aficionados en los salones del Club Ferro Carril Sud en el año 1963." />
                        <p className="history-image-caption">Don Miguel Najdorf brindando partidas simultáneas a los aficionados en los salones del Club Ferro Carril Sud en el año 1963.</p>
                    </div>

                    <h4 className="history-subtitle">Nace otro circulo</h4>
                    <p className="history-text">
                        El trabajo de los dirigentes de Ferro Carril Sud tiene su premio. Se agregan a este movimiento en favor del mejor desarrollo de la actividad otras entidades olavarrienses y de esa forma se incorporan los clubes Estudiantes, Racing, Calera Avellaneda, Loma Negra, San Martín y el Foot Ball Club Sierras Bayas.
                        La primera en hacerse presente con una programación de interés, resulta el Club Estudiantes. Entre los actos programados para la inauguración de la actual sede emplazada en el Parque Carlos Guerrero, organizó el primer torneo interclubes por equipos que se jugó en 1940.
                        Todo este movimiento creó una importante corriente organizativa y fue así que las entidades mencionadas se reunieron y echaron las bases de un nuevo Circulo de Ajedrez pero ya con intenciones federativas. Fue su primer presidente el doctor Vicente Aparicio que fue secundado por otros no menos entusiastas del juego ciencia como el doctor Alberto R. Miotti y el señor Aurelio Pologna.
                        El ente ajedrecístico gestionó la afiliación a la Federación Argentina de Ajedrez y de esa manera el deporte de peones y alfiles fue tomando más vida. Se jugaron torneos individuales en todas las categorías
                        Volvieron a presentarse importantes maestros realizando sesiones de simultáneas, agregándose a muchos de los que ya habían venido por gestión de Ferro Carril Sud, los nombres importantes de Carlos Guimard, Carlos H. Maderna, Paul Keres, Héctor Decio, Rosetto, etc.
                        La naciente entidad desarrollaba su actividad en una dependencia situada en el interior de la Confiteria Rex. Pero posteriormente debió retirarse de allí y comenzó a deambular para culminar en una dependencia alquilada a una casa de la calle 25 de Mayo, casi esquina Coronel Suárez. Pero ya el Circulo prolongaba su vida, merced al entusiasmo de algunos cultores como los señores Pablo Ramos y Aníbal Arroyo. Pero tal situación de inercia de todos hizo que el Circulo terminara por desaparecer.
                    </p>

                    <h4 className="history-subtitle">Ferrocarril Sud sigue firme</h4>
                    <p className="history-text">
                        Pese a todo esto Ferro Carril Sud siguió su marcha. Volvieron a sumarse nuevas voluntades y de esa manera la entidad no solamente fue programando torneos internos, sino que a partir de 1946 y en cuatro años distintos, organizó los Torneos Regionales Olavarría Ciudad de Turismo.
                        Pero el tesón y laboriosidad de sus dirigentes no paró allí. Con la magnífica conducción del señor Dante A. Brun se cumplió en septiembre de 1946 el único Torneo Escolar de Ajedrez realizado en nuestro medio, tratándose por ese entonces el primero de tal naturaleza verificado en el País. Además, se programó el Torneo Nacional de Problemas, primero de este tipo celebrado en Argentina.
                        También le corresponde el honor a los dirigentes y jugadores de Ferro Carril Sud el hecho de haber disputado uno de los primeros matches -si no el primero- radial con aficionados de Estados Unidos. Lo que constituyó todo un hito para la historia del juego ciencia en el país y para orgullo de Olavarría lo fueron los jugadores Reynaldo 0scar Taborelli, Alfredo Sosa y Dante Brun que en consulta jugaron con aficionados de Los Ángeles California, Estados Unidos, quienes fueron Newcombe, Vorkapick y Reinhart (dos hermanos), que actuaron de igual manera. Luego de 5h. 45m., la partida fue declarada tablas. Posteriormente, en noviembre y diciembre volvieron a jugarse enfrentamientos. El primero de ellos comenzó el 2 y concluyó el 16 de noviembre de 1946 Con el siguiente resultado: Ferro C. Sud 3 -. Los Angeles 1 (R. O. Taborelli  ½ -½ Vorkapich , A. Sosa ½ - ½ E. Davis, D. A. Brun 1 -  0 W. Newcombe y C. Grigera 1 – 0 Weis). En el segundo enfrentamiento, ocurrido en diciembre de 1946, el equipo de Ferro Carril Sud logró imponerse por 2 a 1. Actuó como asesor de los norteamericanos el maestro internacional Herman Steiner. Jugaron para los albicelestes los jugadores Alfredo Sosa, Carlos Grigera y Dante Américo Brun. Todo esto fue posible merced a los buenos oficios del señor Reynaldo Alfieri, que con su poderosa estación de onda corta LU8 EE, estableció enlace con la emisora de Los Ángeles, California W6WYC de su colega señorita Dorothy Newcombe. Las ofició de traductor el joven Mario Enrique Alfieri.
                        Todo esto que fue realizando Ferro Carril Sud con miras al progreso y mejor evolución del ajedrez, trajo como consecuencia que a partir de 1943 y con muy contadas ausencias, Ferro Carril Sud fuera invitado a jugar anualmente en el más tradicional, de mayor prestigio de los concursos para aficionados que se celebra en el ámbito bonaerense: Playas de Necochea,
                        También tuvo participación en importantes torneos celebrados en Trenque Lauquen, Bahía Blanca, Coronel Suárez y otros puntos.
                        Desde 1958 y a modo de agradecimiento y recordación por lo mucho que le brindó al ajedrez, se organiza el Torneo Interclubes Memorial Domingo F. Colasurdo.
                    </p>

                    <h4 className="history-subtitle">La nueva etapa</h4>
                    <p className="history-text">
                        Todo lo expresado habla de la preocupación y afán de superación puesto de manifiesto por los dirigentes de Ferro Carril Sud que colocaron a la entidad en un puesto de importancia en el concierto provincial, en lo que se refiere al cultivo y apoyo de la práctica del juego ciencia. Fue así que, en 1961, en oportunidad de cumplirse en Olavarría la Feria Olavarría - Comercial, la nueva sede de la avenida Pringles fue escenario del Campeonato Juvenil Argentino.
                        El 14 de Abril de 1966 luego de varias reuniones se constituyó la Federación de Ajedrez de Olavarria, entidad a la cual apuntaló Ferro Carril Sud no sólo con su afiliación sino con la participación de sus jugadores y equipos.
                        También se nuclearon en el nuevo organismo, formado sobre bases más sólidas que las anteriores, Racing, El Tablero, Calera Avellaneda, San Martín y Loma Negra.
                    </p>
                </Col>
            </Row>
        </Container>
    );
}

