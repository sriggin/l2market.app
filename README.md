# L2Market.app

A meteor based application used for displaying Lineage 2 market prices.

## Pre-requisites

### Linux / OSX

```
curl https://install.meteor.com/ | sh
```

> Take precauction when using commands like this because the script you download may contain pretty much anything. Run it on your own risk! (i.e. check what the script does before you pipe it to an interpreter)

### Windows

To run meteor under Windows you need to [install Chocolatey](https://chocolatey.org/install).

`choco install meteor`

> I don't know Windows well enough to give any advice on its security.

## Running

```
TODO
```

## Build

### Docker

```
TODO
```

### Helm charts

```
TODO
```

## Deployment

```
TODO
```

## Feature requests

Received feature requests:

- Graph with item price changes over time
- Ability to bookmark items/seller/buyers
- Item price watch with alerts (price range)
- Item price warning notifications based on market trend to avoid selling/buying for wrong price
- Scam watch
- More detailed item description (augments, etc) `packet scanner`
- Discord integration
- 0% tax alerts `packet scanner`
- Forum for trading
- Android/iOS app
- Abuse report functionality
- Ability to block or filter out seller/buyer
- Light theme
- Receive notification when someone is selling/buying for lower/higher price than player
- Ability to acquire API key for 3rd party integration
- Functionality for submitting bugs
- Less spam on `/`

## Planned work

- Finish impl. of paywall/access codes `!`
- Create test suite
- Setup CI/CD pipelines
- Refactor packet scanner to support modules
- Limit emit rate on pubs
- Add schema validation
- Replace static announcements with DB backed impl. with time exp.
- Implement user accounts