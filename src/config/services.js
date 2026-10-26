/**
 * Services TruLawns offers. The services section lists them and the
 * free estimate form offers them as choices. Edit them here only.
 * Icons are Material Design Icons names (https://pictogrammers.com/library/mdi/).
 */
module.exports = Object.freeze([
  {
    name: 'Lawn Care',
    description: 'Precision mowing, edging, trimming and blowing on a regular schedule',
    icon: 'mdi-mower'
  },
  {
    name: 'Mulch Installation',
    description: 'Fresh mulch spread in garden beds and planting areas',
    icon: 'mdi-flower'
  },
  {
    name: 'Hedge Trimming',
    description: 'Hedges and shrubs shaped and kept neat',
    icon: 'mdi-content-cut'
  },
  {
    name: 'Yard Cleanups',
    description: 'Leaf removal, debris hauling and overgrown yards brought back in shape',
    icon: 'mdi-leaf'
  },
  {
    name: 'Tree Trimming',
    description: 'Small trees and palms trimmed and kept clear of the house',
    icon: 'mdi-tree'
  },
  {
    name: 'Sod Installation',
    description: 'New sod laid for bare or damaged lawns',
    icon: 'mdi-grass'
  }
].map(service => Object.freeze(service)))
