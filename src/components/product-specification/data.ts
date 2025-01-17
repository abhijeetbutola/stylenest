import blackDesktop from "../../assets/productspecimages/img/black-desktop.jpg"
import chairDesktop from "../../assets/productspecimages/img/chair-desktop.jpg"
import clothesDesktop from "../../assets/productspecimages/img/clothes-desktop.jpg"
import yellowDesktop from "../../assets/productspecimages/img/yellow-desktop.jpg"
import recycle from "../../assets/productspecimages/svg/recycleicon.svg"
import lowImpact from "../../assets/productspecimages/svg/lowimpactdyeicon.svg";
import carbon from "../../assets/productspecimages/svg/carbonneutralicon.svg"
import water from "../../assets/productspecimages/svg/waterconservationicon.svg"
import ergonomics from "../../assets/productspecimages/svg/ergonomicfits.svg"
import softToTouch from "../../assets/productspecimages/svg/softtothetouchfabrics.svg"
import breathable from "../../assets/productspecimages/svg/breathableweaves.svg"
import thoughtful from "../../assets/productspecimages/svg/thoughtfuldesign.svg"
import reinforced from "../../assets/productspecimages/svg/reinforcedconstruction.svg"
import quality from "../../assets/productspecimages/svg/qualitycontrol.svg"
import material from "../../assets/productspecimages/svg/materialresilience.svg"
import warranty from "../../assets/productspecimages/svg/warrantyrepair.svg"
import adaptive from "../../assets/productspecimages/svg/adaptivestyles.svg"
import functional from "../../assets/productspecimages/svg/functionalfashion.svg"
import timeless from "../../assets/productspecimages/svg/timelessaesthetics.svg"
import mixAndMatch from "../../assets/productspecimages/svg/mixmatchpotential.svg"


type Point = {
  icon: string;
  label: string;
}

export type Specification = {
  feature: string;
  descriptionHeading: string;
  description: string;
  image: string;
  points: Point[];
}

const specifications: Specification[] = [
    {
      feature: 'Sustainability',
      descriptionHeading: 'Eco-friendly choice',
      description: 'With our sustainable approach, we curate clothing that makes a statement of care- care for the planet, and for the art of fashion.',
      image: yellowDesktop,
      points: [
        {
          icon: recycle,
          label: 'Recycled Materials',
        },
        {
          icon: lowImpact,
          label: 'Low Impact Dye',
        },
        {
          icon: carbon,
          label: 'Carbon Neutral',
        },
        {
          icon: water,
          label: 'Water Conservation',
        },
      ],
    },
    {
      feature: 'Comfort',
      descriptionHeading: 'Uncompromised Comfort',
      description: 'Our garments are a sanctuary of softness, tailored to drape gracefully and allow for freedom of movement.',
      image: blackDesktop,
      points: [
        {
          icon: ergonomics,
          label: 'Ergonomic Fits',
        },
        {
          icon: softToTouch,
          label: 'Soft-to-the-touch Fabrics',
        },
        {
          icon: breathable,
          label: 'Breathable Weaves',
        },
        {
          icon: thoughtful,
          label: 'Thoughtful Design',
        },
      ],
    },
    {
      feature: 'Durability',
      descriptionHeading: 'Built to Last',
      description: `Here's to apparel that you can trust to look as good as new, wear after wear, year after year.`,
      image: chairDesktop,
      points: [
        {
          icon: reinforced,
          label: 'Reinforced Construction',
        },
        {
          icon: quality,
          label: 'Quality Control',
        },
        {
          icon: material,
          label: 'Material Resilience',
        },
        {
          icon: warranty,
          label: 'Warranty Repair',
        },
      ],
    },
    {
      feature: 'Versatility',
      descriptionHeading: 'Versatile by Design',
      description: 'Our pieces are a celebration of versatility, offering a range of styles that are as perfect for a business meeting as they are for a casual brunch.',
      image: clothesDesktop,
      points: [
        {
          icon: adaptive,
          label: 'Adaptive Styles',
        },
        {
          icon: functional,
          label: 'Functional Fashion',
        },
        {
          icon: timeless,
          label: 'Timeless Aesthetics',
        },
        {
          icon: mixAndMatch,
          label: 'Mix-and-Match Potential',
        },
      ],
    },
  
];

export default specifications;

