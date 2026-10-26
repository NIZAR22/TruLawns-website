/**
 * Customer reviews shown on the site, copied word for word from the
 * testimonials on TruLawns' previous website. Reviewers are shown by first
 * name and last initial. To add one, copy its text exactly; leave out
 * reviews Google shows cut off ("… More") unless you have the full text.
 */
module.exports = Object.freeze([
  {
    name: 'Jade Z.',
    rating: 5,
    text: 'Watched TruLawns mow my neighbors yard for a few months and knew I had to have him! Over the last few months he has done a fantastic job always communicating any issues or conflicts that arise. My lawn is always mowed even with perfect edges. I\'m very pleased with all aspects of the services I have received.'
  },
  {
    name: 'Alyssa L.',
    rating: 5,
    text: 'Trulawns is a fantastic company. They are ALWAYS on time and do extremely good work. I’m so happy I found them!!'
  },
  {
    name: 'Patrick K.',
    rating: 5,
    text: 'No one else I would trust more than TruLawns. Dependable. High quality. Trustworthy. Everything you could ask for.'
  },
  {
    name: 'Jake F.',
    rating: 5,
    text: 'TruLawns does an amazing job each service. Always very polite if I have questions, and they always do a thorough job cleaning up after service. They will go above and beyond to ensure your yard is the best looking yard in the block'
  },
  {
    name: 'Tammy L.',
    rating: 5,
    text: 'TruLawns has done an amazing job for our company. Always very professional, responsive and goes above and beyond. Highly recommend!'
  },
  {
    name: 'Deborah E.',
    rating: 5,
    text: 'Tru Lawns lawn care always goes an excellent job They always communicate with me and are very punctual .. I would highly recommend them.. I never have to worry about them showing up ...'
  },
  {
    name: 'Sean R.',
    rating: 5,
    text: 'Tim is awesome! He always shows up and cuts the lawn with perfection. If you are looking for a good honest lawn guy, Tim is you dude.'
  }
].map(review => Object.freeze(review)))
