import cards from '../../../data/cms.json';

export default function handler(req, res) {
  // return the a lists of cards
  res.status(200).json(cards);
}
