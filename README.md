# Par 3 Pickup

Are you new to golf? Like me? I wanted to create a fun experience for us newbies, to keep us engaged while we struggle through the ridiculous, embarassing, downright depressing period known as being a 'beginner' in golf. You can keep track of your best score on a particular hole, on any par3 course in Seattle. If you are having a terrible round, and have no way of beating your all time score on a course, at least you can focus on getting that sweet, sweet par on hole 6.
<br /><br />
For each par, birdie and a few other surprise achievements - you earn 10 Golf Coin, a fancy digital asset/cryptocurrency I created using the Stellar Blockchain. You can then turn around, and bet Golf Coin (GC) on 'skins' with your friends, which is a way of betting 'I will have the lowest score on hole 3' and adding some friendly (and captivating) competition to an otherwise normal day on the Par 3 course.

### Open-Source Development

Want to contribute? Great!

To fix a bug or contribute a new feature, follow these steps:

- Fork the repo
- Run `yarn` to install the dependencies, once you have `cd`'d into the directory
- Run `yarn build` to create the next-generated pages
- Run `yarn development` to start the dev server
- Create a new branch (`git checkout -b improve-feature`)
- Make the appropriate changes in the files
- Add Git changes to reflect the changes made
- Commit your changes (`git commit -m 'Improve feature'`)
- Push to the branch
- Send a PR, and become a legend

### Bug / Feature Request

If you find a bug, have a great idea or just a question - please open an issue [here](https://github.com/mikhael28/seattle-par-3/issues/new)!

## Built with

- [React + TypeScript](https://reactjs.org/) - It's a bit of a hybrid - lots of TS, with some JS components mixed in. Will be migrating everything to TS over time, making more detailed and thorough object models.
- [Progressive Web Application](https://web.dev/progressive-web-apps/) - Better than investing time into a mobile application, I figure that having the offline functionality of a PWA will give us the right balance of features and accessibility. Right now, the PWA only installs on mobile - this is 100% intended to be used on phones, while on the links.
- [Stellar Blockchain](https://www.stellar.org/) - In order to make Golf Coins, we turned to the blockchain. We needed an affordable (*cough*Ethereum is expensive*cough*), scalable solution that would let us issue our own assets easily. Stellar fit the bill.
- [AWS Lambda](https://aws.amazon.com/lambda/) - We needed a service to store our Stellar and DynamoDB authentication/data storage, and wanted to avoid paying $10/mo for a container instance on a side-project that is only used by two people (as of 8.12.21, at least)
- [DynamoDB](https://aws.amazon.com/dynamodb/) - The 'correct' way of using a DynamoDB table, at least according to some ReInvent talks I watched, is to have multiple different storage options with the partition key? For example, as long as your partition key is a string, you can query events with a specific date ('6-12-2021'), or a specific type/brand (for example, 'Gucci') and return different types of items. All in all, this entire application is stored on a single DynamoDB table with multiple access patterns made available through a flexible partition/sort-key schema.


## Team

[![Michael 'Misha' Litchev](https://avatars.githubusercontent.com/u/15205259?s=400&u=64ad9374b8d98f09dc5709fcc737e5ec4f2447f3&v=4)](https://github.com/mikhael28)

## [License](https://github.com/mikhael28/seattle-par-3/blob/main/LICENSE)

GNU General Public License Version 2 Only © [Michael 'Misha' Litchev](https://github.com/mikhael28)
