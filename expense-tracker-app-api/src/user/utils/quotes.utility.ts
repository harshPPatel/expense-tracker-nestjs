export class QuotesUtility {
  public static getRandomQuote(): string {
    const quotes = [
      'Look everywhere you can to cut a little bit from your expenses. It will all add up to a meaningful sum.',
      'Control your expenses better than your competition. This is where you can always find the competitive advantage.',
      'Beware of little expenses. A small leak will sink a ship.',
      'Know the difference between your necessary and discretionary expenses.',
      'Clearly, any issues about breaching of expenses rules should be properly investigated.',
    ];

    return quotes[Math.floor(Math.random() * quotes.length)];
  }
}
