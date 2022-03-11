# svg-trait-combinator

Quick and dirty implementation of a script that puts together a combination of a series of traits and their mapped svg counterparts. To be used to generate traits for individual nfts from a list of all possible traits.

The input folder provides a demo input that needs to be used as a model for your inputs. They will be explained in more detail in the sections below.

# Running the project

Using the following in your cli should run the demo project, generating an output directory with all the svg and json combinations from the traits provided in inputs.

```
node demo.js
``` 

or

```
yarn demo
```

or

```
npm run demo
```

The same commands would be used if you replace the inputs with your own inputs to get your desired outputs.

# Input modeling

Let's establish some terms first. Let's say your generative nft is different colored squares of the same size centered on different colored backgrounds.

You could boil this down to two "trait types" (`traitType`) let's name them `background-color` and `square`.

Both `background-color` and `square` could have a "trait" (`trait`) like red, green or blue. 

In the input directory there needs to be a `traits.json` and a svg directory. 

## JSON traits
In the `trait.json` file, the json properties would be the `traitType`s and the value for that `traitType` would be an array of the `trait`s. 

Going back to the example above, the following would be the content in the `traits.JSON` file:
```json
{
    "background-color": ["red", "blue", "green"],
    "square": ["red", "blue", "green"]
}
```

## SVG traits
In the svg directory you would have the svg assets for each trait. For example, one svg file would only have a full frame with a red background. The svg code for the red background could be the following:

```html
<svg
    width="512"
    height="512"
    viewBox="0 0 135.46667 135.46667"
    version="1.1"
    id="svg5"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:svg="http://www.w3.org/2000/svg">
    <rect
        style="fill:#ff5555;stroke-width:0.79375;stroke-linecap:round;stroke-linejoin:round"
        id="rect973"
        width="135.46666"
        height="135.46666"
        x="0.41341141"
        y="-0.35314178" />
</svg>
```

`DISCLAIMER: You need to make sure that the starting svg tag for every asset is the same.`

So, this file would go into `svg/background-color/` and be named `red.svg`.

The directory name has to correspond to the `traitType` name in the JSON file. For example, the JSON property name `background-color` maps to the directory name `background-color`.

The svg file name has to correspond to the `trait` name in the JSON file. For example, the string in the JSON value array `red` maps to the svg file name `red`.