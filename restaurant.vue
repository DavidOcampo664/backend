<template>
  <div class="michilans-app">
    <!-- Sección Hero -->
    <section class="hero-section">
      <h1 class="main-title">The Michilans Experience</h1>
    </section>

    <!-- Sección Intro -->
    <section class="intro-section">
      <p class="intro-text">
        At Michilans, we believe that dining is more than just a meal—it's a journey. Our master
        chefs meticulously select the freshest, highest-grade ingredients from around the world,
        ensuring that each dish reflects the pinnacle of quality. With every bite, you'll discover
        the delicate balance of flavors, textures, and aromas that define true culinary excellence.
      </p>
      
      <p class="intro-text">
        Our menu is a celebration of both traditional and innovative creations. From perfectly
        seasoned meats to artfully crafted dishes, each plate is prepared with the utmost care and
        attention to detail. Whether you're enjoying our signature tasting menu or selecting
        your favorites à la carte, you can trust that every dish embodies our commitment to
        culinary perfection.
      </p>
    </section>

    <!-- Galería -->
    <section class="gallery-section">
      <h2 class="section-title">Explore Our Gallery</h2>
      <p class="gallery-text">
        At Michilans, every dish is a work of art, meticulously crafted to delight both the eye and
        the palate. Our gallery offers a glimpse into the expansive world of fine dining,
        where craftsmanship meets culinary artistry.
      </p>
      
      <div class="image-gallery">
        <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format" alt="Fine dining presentation">
        <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format" alt="Chef preparing food">
        <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format" alt="Restaurant interior">
        <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format" alt="Gourmet dish">
        <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format" alt="Artistic plating">
        <img src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&auto=format" alt="Elegant dining">
      </div>
      
      <p class="gallery-text">
        From the vibrant colors of our seasonal ingredients to the intricate presentation of our signature dishes,
        every image captures the essence of the Michilans experience. Let the imagery inspire your
        next visit, where you'll experience the perfect harmony of flavors and aesthetics that await.
      </p>
    </section>

    <!-- Secciones adicionales -->
    <section class="feature-section">
      <h2 class="section-title">A Refined Atmosphere</h2>
      <p class="feature-text">
        At Michilans, we've designed a space that complements the exceptional dining experience we
        offer. Our elegant, modern interior combines clean lines and warm accents to create an
        atmosphere that is both sophisticated and inviting. Whether it's an intimate dinner
        or a special celebration, our staff will ensure that your time with us is as
        exceptional and memorable as the cuisine itself.
      </p>
    </section>

    <section class="feature-section">
      <h2 class="section-title">Unparalleled Craftsmanship</h2>
      <p class="feature-text">
        Our chefs are trained in the traditional techniques of fine cuisine while
        incorporating modern innovation. Each dish reflects their
        skill and creativity, blending time-honored methods with contemporary flair. From the
        selection of ingredients to the delicate presentation, every aspect of your meal is crafted with
        artistry and passion.
      </p>
    </section>

    <section class="feature-section last-section">
      <h2 class="section-title">Exquisite Flavors</h2>
      <p class="feature-text">
        Our restaurant is a sanctuary for those who seek the finest dining experience, prepared with
        precision, and served with exceptional attention to detail. From the moment you arrive until your
        departure, you'll be immersed in an atmosphere of elegance and tranquility, where every detail is
        designed to provide an unforgettable experience.
      </p>
    </section>
  </div>
</template>

<script>
export default {
  name: 'MichilansExperience'
}
</script>

<style scoped>
.michilans-app {
  font-family: 'Georgia', serif;
  color: #333;
  line-height: 1.6;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.hero-section {
  text-align: center;
  padding: 60px 0 40px;
  border-bottom: 1px solid #eaeaea;
  margin-bottom: 40px;
}

.main-title {
  font-size: 2.8rem;
  font-weight: 300;
  letter-spacing: 1px;
  color: #222;
  margin-bottom: 20px;
}

.intro-section {
  margin-bottom: 60px;
}

.intro-text {
  font-size: 1.1rem;
  margin-bottom: 25px;
  text-align: justify;
}

.section-title {
  font-size: 1.8rem;
  font-weight: 300;
  text-align: center;
  margin: 50px 0 30px;
  color: #222;
  letter-spacing: 1px;
}

.gallery-text {
  font-size: 1.1rem;
  margin: 0 auto 40px;
  max-width: 800px;
  text-align: center;
}

.image-gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 40px 0 60px;
}

.image-gallery img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.image-gallery img:hover {
  transform: scale(1.02);
}

.feature-section {
  margin-bottom: 60px;
  padding-bottom: 40px;
  border-bottom: 1px solid #eaeaea;
}

.feature-section.last-section {
  border-bottom: none;
}

.feature-text {
  font-size: 1.1rem;
  text-align: justify;
  max-width: 800px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .main-title {
    font-size: 2rem;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
  
  .image-gallery {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .intro-text, .gallery-text, .feature-text {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .image-gallery {
    grid-template-columns: 1fr;
  }
  
  .hero-section {
    padding: 40px 0 30px;
  }
}
</style>
