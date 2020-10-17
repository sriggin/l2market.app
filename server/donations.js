import { Donations } from '/imports/api/donations.js';

// Meteor.startup(() => {
//   entries = [
//     ['2020-10-01T12:00:25',2.00,'<name>'],
//     ['2020-10-01T12:00:25',2.00,'<name>'],
//   ];

//   entries.forEach(entry => {
//     Donations.insert({
//       createdAt: new Date(entry[0]),
//       amount: entry[1],
//       name: entry[2]
//     }, function(error, result){ 
//         if (error) console.log('error', error);
//         if (result) console.log('result', result);
//       });
//   });
// });
