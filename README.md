    🚴‍♀️ Bici Shop

    Bici Shop es una aplicación de e-commerce para la venta de bicicletas (urbanas, MTB, de carrera, eléctricas) y accesorios. Diseñada para ofrecer una experiencia práctica y minimalista, permite a los usuarios explorar, comprar productos, marcar sus pisas de bicicleta preferidas y gestionar su perfil personal.

	📋 Características principales

	•	Registro e inicio de sesión de usuarios, con almacenamiento seguro en Firebase.
	•	Navegación a través de una BottomTabBar para desplazarse entre las pantallas principales.
	•	Exploración de productos filtrados por categorías.
	•	Subida de fotos de perfil utilizando la cámara del dispositivo.
	•	Registro y visualización de rutas y ubicaciones relacionadas con el ciclismo mediante mapas.
	•	Funcionalidad de carrito de compras y gestión de recibos de compra.
	•	Cierre de sesión para garantizar la privacidad.


    🖥️ Tecnologías utilizadas

	•	React Native con Expo
	•	Redux Toolkit: Gestión del estado global de la aplicación.
	•	Expo Location: Funcionalidad de ubicación y mapas.
	•	Expo Camera: Captura de fotos para el perfil.
	•	Expo SQLite: Base de datos local para gestión de datos.
	•	Firebase: Almacenamiento de usuarios, productos y recibos.
	•	Yup: Biblioteca de definición y validación de esquemas de objetos.


    💻 Estructura de la aplicación

	•	Carpeta Global: Se utiliza para gestionar los colores de la app de manera centralizada, manteniendo el código más organizado y limpio.
	•	Carpeta Firebase: Contiene las configuraciones necesarias para conectar la aplicación con la base de datos.
	•	Carpeta Components: Alberga componentes reutilizables:el estilo de fuentes,  el Header, la barra de búsqueda , el cameraicon y el flatcard,.
	•	Carpeta App: Incluye el archivo store.js, que funciona como el contenedor global del estado utilizando Redux Toolkit. Combina reducers y middleware para manejar el estado general y la lógica de interacción con las APIs mediante RTK Query.
	•	Archivos Services: Permiten definir y gestionar los endpoints de las APIs mediante Redux Toolkit, facilitando la creación de consultas y mutaciones. Estos manejan automáticamente las solicitudes HTTP y su estado (carga, éxito, error) en relación con usuarios, tiendas y órdenes de compra.
	•	Carpeta Features: Contiene los slices, que gestionan acciones para establecer, actualizar o eliminar información del usuario, carrito y tienda.
	•	Archivos Validations: Utilizan la biblioteca Yup para realizar la validación de formularios, como en el caso de SignupScreen.
	•	Carpeta Screens y Navigator: Agrupan las vistas y navegadores correspondientes:
	◦	ShopNavigator:
	▪	Categorías (CategoriesScreen)
	▪	Lista de productos (ProductsScreen)
	▪	Vista detallada del producto seleccionado (ProductScreen)
    ◦	CartNavigator:
	▪	Carrito de compras (CartScreen)
    ◦	MyPlacesNavigator:
	▪	Se ubican los mapas (MyPlacesScreen)
    ◦	AuthNavigator:
	▪	Registro (SignupScreen)
	▪	Inicio de sesión (LoginScreen)
    ◦	ReceiptsNavigator:
	▪	Facturas emitidas por compras realizadas (ReceiptScreen) *(La pantalla de Facturas solo está disponible para usuarios registrados.)◦	ProfileNavigator:
	▪	Perfil de usuario (ProfileScreen)
    ◦	TabNavigator: Gestiona los navegadores de Tienda (Shop), Carrito, Facturas,  Perfil y Mapas.
    ◦	MainNavigator: Es el navegador principal que determina si se muestra el TabNavigator (para usuarios registrados) o el AuthNavigator (para quienes aún no han iniciado sesión).

 
    📱 Pantallas de la aplicación

	1	LoginScreen: Pantalla de inicio de sesión.
	2	SignupScreen: Registro de nuevos usuarios.
	3	ProfileScreen: Gestión del perfil de usuario.
	4	MyPlacesScreen: Visualización de ubicaciones en un mapa.
	5	ProductScreen: Detalles de un producto específico.
	6	ProductsScreen: Vista de productos disponibles.
	7	CategoriesScreen: Filtros por categoría.
	8	ReceiptsScreen: Gestión de recibos de compra.
	9	CartScreen: Carrito de compras.

   
    🚀 Instalación y uso
	
    Requisitos previos:
    1	Tener instalado Node.js.
	2	Instalar Expo CLI: 
            npm install -g expo-cli
	Pasos de la instalación:
    1.- Clona este repositorio: git clone <URL-del-repositorio> cd bici-shop
    2.- Instala las dependencias: npm install
    3.- Inicia la aplicación en modo desarrollo: npx expo start (sudo en MacOs)
    4.- Escanea el código QR generado con la aplicación Expo Go en tu dispositivo físico o usa un emulador.


    🎯 Funcionalidades destacadas

	•	Exploración de productos: Filtra y busca productos por categorías desde la base de datos de Firebase.
	•	Cámara integrada: Toma y sube tu foto de perfil directamente desde la app.
	•	Mapas interactivos: Marca rutas y bicicleterías cercanas utilizando Expo Location.
	•	Gestión de sesiones: Fácil registro, inicio y cierre de sesión


    🛠️ Credenciales de usuarios

    La aplicación incluye un usuario preconfigurado para pruebas: visitor@bici-shop.com
	Tambien se ha incluido un usario ya registrado a los mismos fines:
	•	Correo electrónico: cem@cmail.com
	•	Contraseña: 123456








