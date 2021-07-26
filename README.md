# Par 3 Pickup
Are you new to golf? Like me? I wanted to create a fun experience for us newbies, to keep us engaged while we struggle through the ridiculous, embarassing, downright depressing period known as being a 'beginner' in golf. You can keep track of your best score on a particular hole, on any par3 course in Seattle. If you are having a terrible round, and have no way of beating your all time score on a course, at least you can focus on getting that sweet, sweet par on hole 6. 
<br />
For each par, birdie and a few other surprise achievements - you earn 10 Golf Coin, a fancy digital asset/cryptocurrency I created using the Stellar Blockchain. You can then turn around, and bet Golf Coin (GC) on 'skins' with your friends, which is a way of betting 'I will have the lowest score on hole 3' and adding some friendly (and captivating) competition to an otherwise normal day on the Par 3 course.

## We are live folks
Start chipping away at https://seattlepar3.com

### Open-Source Development
Want to contribute? Great!

To fix a bug or contribute a new feature, follow these steps:

- Fork the repo
- Create a new branch (`git checkout -b improve-feature`)
- Make the appropriate changes in the files
- Add Git changes to reflect the changes made
- Commit your changes (`git commit -m 'Improve feature'`)
- Push to the branch (`git push origin improve-feature`)
- Send the PR, and become a legend

### Bug / Feature Request

If you find a bug, have a great idea or just a question - please open an issue [here](https://github.com/mikhael28/seattle-par-3/issues/new)!

## Built with 

- [React + TypeScript](https://reactjs.org/) - It's a bit of a hybrid - lots of TS, with some JS components mixed in. Will be migrating everything to TS over time, making more detailed and thorough object models.
- [Progressive Web Application](https://web.dev/progressive-web-apps/) - It's a bit of a hybrid - lots of TS, with some JS components mixed in. Will be migrating everything to TS over time, making more detailed and thorough object models.
- [Stellar Blockchain](https://www.stellar.org/) - In order to make Golf Coins, we turned to the blockchain. We needed an affordable (*cough*Ethereum is expensive*cough*), scalable solution that would let us issue our own assets easily. Stellar fit the bill.
- [AWS Lambda](https://aws.amazon.com/lambda/) - We needed a service to store our Stellar and DynamoDB authentication/data storage. Storing blockchain private keys in the front-end is a no-no.
- [DynamoDB](https://aws.amazon.com/dynamodb/) - Did you know that the 'correct' way of using a DynamoDB table is to have multiple different storage options with the partition key? For example, as long as your partition key is a string, you can query events with a specific date, or a specific type/brand (for example, 'Gucci'). All in all, this entire application is stored on a single DynamoDB table with multiple access patterns made available through a flexible partition/sort-key schema.

## To-do
- Migrating the Stellar blockchain off the 'test-net' onto the production service. This... costs money (not a lot, one XLM is 20cents) but still makes me hesitant. Definitely on the to-do list, before public advertising/promotion.
- Stability testing, making sure things don't break - and to record what does (adding Sentry, for example, or LogRocket if I feel good). While single-player achievement tracking works flawlessly, I may or may not have :'( introduced one or two bugs over the weekend (7/23-25) that I haven't had time to fix.
- Online matchmaking for notifications, helping make people aware of games that are announced.
- Invite your LinkedIn contacts to join a round of par 3
- Re-enable/re-work Ethereum betting payments. We have MetaMask working, but want to make the user experience a bit smarter. This should actually be a part of stability testing.
- Online leaderboards, tracking the legends at a particular course

## Team

[![Michael 'Misha' Litchev](https://avatars.githubusercontent.com/u/15205259?s=400&u=64ad9374b8d98f09dc5709fcc737e5ec4f2447f3&v=4)](https://github.com/mikhael28)
---|---

## [License](https://github.com/mikhael28/seattle-par-3/blob/main/LICENSE)

GNU General Public License Version 2 Only © [Michael 'Misha' Litchev](https://github.com/mikhael28)
