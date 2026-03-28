import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const menuItems = [
  {
    name: 'The Eclipse',
    desc: 'Gin, fleur de sureau, champagne, citron vert',
    price: '18€',
    image: '/cocktail-eclipse.jpg', // Remplacez par vos liens
  },
  {
    name: "Nuit d'Orient",
    desc: 'Whisky japonais, yuzu, matcha, gingembre',
    price: '22€',
    image: '/cocktail-velours.jpg', // Remplacez par vos liens
  },
  {
    name: 'Velours Noir',
    desc: 'Rhum vieilli, café arabica, cacao, vanille',
    price: '20€',
    image: '/cocktail-nuit.jpg', // Remplacez par vos liens
  },
  {
    name: 'Le Mirage',
    desc: 'Vodka infusée, passion, litchi, rose',
    price: '19€',
    image: '/cocktail-nuit.jpg', // Remplacez par vos liens
  },
  {
    name: 'Art Déco Sour',
    desc: "Bourbon, sirop d'érable, citron, œuf",
    price: '17€',
    image: '/cocktail-velours.jpg', // Remplacez par vos liens
  },
  {
    name: 'Crépuscule',
    desc: 'Mezcal, Aperol, ananas rôti, piment',
    price: '21€',
    image: '/cocktail-eclipse.jpg', // Remplacez par vos liens
  },
];

const MenuSection = () => {
  return (
    <section id="carte" className="relative py-36 px-6 bg-[#000000] overflow-hidden">
      {/* Ligne décorative en arrière-plan */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-primary/20 to-transparent" />

      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-body text-[10px] tracking-[0.6em] uppercase text-primary/70 mb-5">Savourer</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-wide text-foreground mb-8">
            Nos Créations
          </h2>
          <div className="art-deco-line w-32 mx-auto" />
        </motion.div>

        {/* Grille de Cocktails */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {menuItems.map((item, i) => (
            <motion.div
              key={i}
              className="group relative flex flex-col bg-white/5 border border-white/10 overflow-hidden rounded-sm hover:border-primary/30 transition-all duration-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* Conteneur Image avec zoom au hover */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="object-cover w-full h-full grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070619] via-transparent to-transparent opacity-60" />
              </div>

              {/* Contenu Texte */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-display text-xl text-foreground group-hover:text-primary transition-colors duration-500 tracking-wide">
                    {item.name}
                  </h3>
                  <span className="font-display text-lg text-primary/90">{item.price}</span>
                </div>
                <p className="font-body text-xs leading-relaxed text-muted-foreground/70 tracking-wider">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link
            to="/menu"
            className="hidden md:inline-block font-body text-xs tracking-[0.3em] uppercase px-6 py-2.5 border border-white text-white hover:bg-white hover:text-primary-foreground transition-all duration-300 rounded-full"
          >
            Voir la carte complète
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default MenuSection;
