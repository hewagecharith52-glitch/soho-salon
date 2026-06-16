const html = document.documentElement;
const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");
const wrapper = document.querySelector('.animation-wrapper');

const frameCount = 240;
const currentFrame = index => (
  `./frames/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`
)

const preloadImages = () => {
  for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};

const img = new Image();
img.src = currentFrame(1);

img.onload = function(){
  canvas.width = img.width;
  canvas.height = img.height;
  context.drawImage(img, 0, 0);
}

const updateImage = index => {
  img.src = currentFrame(index);
  context.drawImage(img, 0, 0);
}

window.addEventListener('scroll', () => {  
  const rect = wrapper.getBoundingClientRect();
  const scrollTop = -rect.top;
  const maxScrollTop = wrapper.scrollHeight - window.innerHeight;
  
  let scrollFraction = scrollTop / maxScrollTop;
  if (scrollFraction < 0) scrollFraction = 0;
  if (scrollFraction > 1) scrollFraction = 1;

  const frameIndex = Math.min(
    frameCount,
    Math.max(1, Math.ceil(scrollFraction * frameCount))
  );
  
  requestAnimationFrame(() => updateImage(frameIndex));
});

preloadImages();
