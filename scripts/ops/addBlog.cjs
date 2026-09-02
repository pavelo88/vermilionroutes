const fs = require('fs');

let c = fs.readFileSync('data/blogData.ts', 'utf8');
let idx = c.lastIndexOf('];');

if (idx !== -1) {
  let newPost = `  {
    id: 'post-ponchos-otavalo',
    slug: 'el-arte-del-poncho-andino',
    title: {
      en: 'The Art of the Poncho: Andean Master Weavers',
      es: 'El Arte del Poncho: Maestros Tejedores Andinos'
    },
    subtitle: {
      en: 'Discover the history, cultural significance, and ancestral techniques behind Ecuador\\'s most iconic garment at Plaza de Ponchos.',
      es: 'Descubre la historia, el significado cultural y las técnicas ancestrales detrás de la prenda más icónica de Ecuador en la Plaza de Ponchos.'
    },
    excerpt: {
      en: 'The poncho is more than just a garment; it is a symbol of Andean identity. Learn how Kichwa communities in Otavalo preserve ancient backstrap loom weaving traditions.',
      es: 'El poncho es más que una prenda; es un símbolo de identidad andina. Conoce cómo las comunidades Kichwa en Otavalo preservan las tradiciones del telar de cintura.'
    },
    category: {
      en: 'Culture & Heritage',
      es: 'Cultura y Patrimonio'
    },
    author: {
      name: 'Jhayro Ludeña',
      role: 'Head Naturalist & Expedition Planner',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    publishedAt: '2026-08-31',
    readTime: '5 min read',
    imageUrl: '/images/tours/16-9/otavalo-market-16-9.jpg',
    featured: false,
    tags: ['Otavalo', 'Plaza de Ponchos', 'Culture', 'Handicrafts', 'Textiles', 'Ecuador'],
    relatedTourId: 'otavalo-indigenous-market',
    content: {
      en: \`
## What is a Poncho?

A **poncho** is a traditional Andean outer garment designed to keep the body warm while allowing freedom of movement. Structurally, it is a large piece of woven fabric with an opening in the center for the head. However, culturally, it represents centuries of history, resilience, and identity for the indigenous peoples of the Andes.

In Ecuador, particularly in the northern highlands around Imbabura, the poncho is an essential part of daily life and ceremonial dress for the Kichwa Otavalo people. 

## The Craftsmanship Behind the Threads

The creation of a high-quality poncho is an intricate process that can take weeks. It begins with the shearing of sheep or alpacas. The raw wool is then washed, carded, and spun by hand using a *huso* (drop spindle). 

One of the most fascinating aspects of traditional weaving is the dyeing process. Master weavers use natural elements extracted from the Andean environment:
- **Cochineal** (a small cactus insect) for deep reds and purples.
- **Walnut leaves** (*tocte*) for rich browns.
- **Indigo** plants for brilliant blues.

Once the yarn is prepared, the weaving takes place on either a traditional **backstrap loom** (an ancient pre-Columbian tool tied around the weaver's waist) or a larger Spanish-introduced treadle loom.

## Plaza de Ponchos: The Heart of Artisan Trade

The best place to witness this living tradition is the **Plaza de Ponchos** in Otavalo, internationally recognized as the largest artisan market in South America. Here, indigenous families gather to showcase their textile masterpieces, continuing a legacy of trade that predates the Inca Empire.

When you purchase a poncho at the Plaza de Ponchos, you are not just buying clothing; you are taking home a piece of Ecuadorian heritage and directly supporting the sustainable livelihoods of Kichwa artisan families.\`,
      es: \`
## ¿Qué es un Poncho?

Un **poncho** es una prenda exterior tradicional andina diseñada para mantener el cuerpo caliente y, al mismo tiempo, permitir libertad de movimiento. Estructuralmente, es una gran pieza de tela tejida con una abertura en el centro para la cabeza. Sin embargo, culturalmente, representa siglos de historia, resistencia e identidad para los pueblos andinos.

En Ecuador, particularmente en la sierra norte (provincia de Imbabura), el poncho es una parte esencial de la vida diaria y la vestimenta ceremonial del pueblo Kichwa Otavalo.

## La Artesanía detrás de los Hilos

La creación de un poncho de alta calidad es un proceso minucioso que puede llevar semanas. Comienza con la esquila de ovejas o alpacas. Luego, la lana cruda se lava, se carda y se hila a mano usando un *huso*.

Uno de los aspectos más fascinantes del tejido tradicional es el proceso de teñido. Los maestros tejedores utilizan elementos naturales extraídos del entorno andino:
- **Cochinilla** (un insecto del cactus) para rojos y morados profundos.
- **Hojas de nogal** (*tocte*) para marrones intensos.
- **Índigo** para azules brillantes.

Una vez que el hilo está preparado, el tejido se realiza en un **telar de cintura** tradicional (una antigua herramienta precolombina atada a la cintura del tejedor) o en un telar de pedal más grande, introducido durante la época colonial.

## Plaza de Ponchos: El Corazón del Comercio Artesanal

El mejor lugar para presenciar esta tradición viva es la **Plaza de Ponchos** en Otavalo, reconocida internacionalmente como el mercado artesanal más grande de Sudamérica. Aquí, las familias se reúnen para exhibir sus obras maestras textiles, continuando un legado de comercio que es anterior al Imperio Inca.

Al comprar un poncho en la Plaza de Ponchos, no solo estás adquiriendo ropa; te estás llevando a casa una pieza del patrimonio ecuatoriano y apoyando directamente el sustento sostenible de las familias artesanas Kichwa.\`
    }
  },
`;
  c = c.slice(0, idx) + newPost + c.slice(idx);
  fs.writeFileSync('data/blogData.ts', c);
  console.log('Blog post added');
}
