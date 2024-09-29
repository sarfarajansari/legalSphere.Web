import React, { useEffect, useMemo, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import LocationEvent from "./locationEvent";

const complaints = [
  {
    name: "Rahul Sharma",
    emailId: "rahul.sharma@example.com",
    address: {
      addressLine: "DLF Cyber City",
      coordinates: [77.0887, 28.4946],
      city: "Gurgaon",
      state: "Haryana",
      country: "India",
      zipcode: "122002",
    },
    assignedTo: null,
    currentStatus: "Active",
    comments: "Issue with internet connectivity.",
    images: [
      "https://t3.ftcdn.net/jpg/00/52/48/66/360_F_52486643_JZL97JZ9tKzTGWO7RU3wf2ZvOZ9LjcPs.jpg",
      "https://images.hindustantimes.com/rf/image_size_960x540/HT/p2/2017/01/25/Pictures/india-environment-waste-social_c8ebb536-e2bc-11e6-95da-c88e93771820.jpg",

      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGB9AfrtqkJsgzm2BuQV4FI_Xi6TEBSqho-w&s",
      "https://c8.alamy.com/comp/BBKAFE/garbage-collection-india-tamil-nadu-madurai-no-releases-available-BBKAFE.jpg",
    ],
  },
  {
    name: "Anjali Mehta",
    emailId: "anjali.mehta@example.com",
    address: {
      addressLine: "Ambience Mall",
      coordinates: [77.0971, 28.5033],
      city: "Gurgaon",
      state: "Haryana",
      country: "India",
      zipcode: "122001",
    },
    assignedTo: null,
    currentStatus: "In Progress",
    comments: "Air conditioning is not working.",
    images: [
      "https://t3.ftcdn.net/jpg/00/52/48/66/360_F_52486643_JZL97JZ9tKzTGWO7RU3wf2ZvOZ9LjcPs.jpg",
      "https://images.hindustantimes.com/rf/image_size_960x540/HT/p2/2017/01/25/Pictures/india-environment-waste-social_c8ebb536-e2bc-11e6-95da-c88e93771820.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDdhKPcv0Zdy139Yrq2-TPB_rgrFVWev9Xng&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmYgycqqj4CeriE6TuWEP2zE6IpWl7Fd0tcg&s",
    ],
  },
  {
    name: "Vikram Singh",
    emailId: "vikram.singh@example.com",
    address: {
      addressLine: "Kingdom of Dreams",
      coordinates: [77.0687, 28.4633],
      city: "Gurgaon",
      state: "Haryana",
      country: "India",
      zipcode: "122018",
    },
    assignedTo: null,
    currentStatus: "Resolved",
    comments: "Noise complaint.",
    images: [
      "https://t3.ftcdn.net/jpg/00/52/48/66/360_F_52486643_JZL97JZ9tKzTGWO7RU3wf2ZvOZ9LjcPs.jpg",

      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmYgycqqj4CeriE6TuWEP2zE6IpWl7Fd0tcg&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGB9AfrtqkJsgzm2BuQV4FI_Xi6TEBSqho-w&s",
      "https://c8.alamy.com/comp/BBKAFE/garbage-collection-india-tamil-nadu-madurai-no-releases-available-BBKAFE.jpg",
    ],
  },
  {
    name: "Priya Gupta",
    emailId: "priya.gupta@example.com",
    address: {
      addressLine: "Sector 29",
      coordinates: [77.0722, 28.4629],
      city: "Gurgaon",
      state: "Haryana",
      country: "India",
      zipcode: "122022",
    },
    assignedTo: null,
    currentStatus: "Active",
    comments: "Water leakage in the basement.",
    images: [
      "https://t3.ftcdn.net/jpg/00/52/48/66/360_F_52486643_JZL97JZ9tKzTGWO7RU3wf2ZvOZ9LjcPs.jpg",
      "https://images.hindustantimes.com/rf/image_size_960x540/HT/p2/2017/01/25/Pictures/india-environment-waste-social_c8ebb536-e2bc-11e6-95da-c88e93771820.jpg",

      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGB9AfrtqkJsgzm2BuQV4FI_Xi6TEBSqho-w&s",
      "https://c8.alamy.com/comp/BBKAFE/garbage-collection-india-tamil-nadu-madurai-no-releases-available-BBKAFE.jpg",
    ],
  },
  {
    name: "Amit Verma",
    emailId: "amit.verma@example.com",
    address: {
      addressLine: "MG Road Metro Station",
      coordinates: [77.0844, 28.4806],
      city: "Gurgaon",
      state: "Haryana",
      country: "India",
      zipcode: "122002",
    },
    assignedTo: null,
    currentStatus: "In Progress",
    comments: "Elevator not working.",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDdhKPcv0Zdy139Yrq2-TPB_rgrFVWev9Xng&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmYgycqqj4CeriE6TuWEP2zE6IpWl7Fd0tcg&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGB9AfrtqkJsgzm2BuQV4FI_Xi6TEBSqho-w&s",
      "https://c8.alamy.com/comp/BBKAFE/garbage-collection-india-tamil-nadu-madurai-no-releases-available-BBKAFE.jpg",
    ],
  },
  {
    name: "Kavita Desai",
    emailId: "kavita.desai@example.com",
    address: {
      addressLine: "Sohna Road",
      coordinates: [77.0634, 28.3946],
      city: "Gurgaon",
      state: "Haryana",
      country: "India",
      zipcode: "122103",
    },
    assignedTo: null,
    currentStatus: "Resolved",
    comments: "Street lights not functioning.",
    images: [
      "https://t3.ftcdn.net/jpg/00/52/48/66/360_F_52486643_JZL97JZ9tKzTGWO7RU3wf2ZvOZ9LjcPs.jpg",
      "https://images.hindustantimes.com/rf/image_size_960x540/HT/p2/2017/01/25/Pictures/india-environment-waste-social_c8ebb536-e2bc-11e6-95da-c88e93771820.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDdhKPcv0Zdy139Yrq2-TPB_rgrFVWev9Xng&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmYgycqqj4CeriE6TuWEP2zE6IpWl7Fd0tcg&s",
    ],
  },
  {
    name: "Rohan Joshi",
    emailId: "rohan.joshi@example.com",
    address: {
      addressLine: "Ardee City",
      coordinates: [77.0868, 28.4489],
      city: "Gurgaon",
      state: "Haryana",
      country: "India",
      zipcode: "122001",
    },
    assignedTo: null,
    currentStatus: "Active",
    comments: "Garbage collection issue.",
    images: [
      "https://t3.ftcdn.net/jpg/00/52/48/66/360_F_52486643_JZL97JZ9tKzTGWO7RU3wf2ZvOZ9LjcPs.jpg",
      "https://images.hindustantimes.com/rf/image_size_960x540/HT/p2/2017/01/25/Pictures/india-environment-waste-social_c8ebb536-e2bc-11e6-95da-c88e93771820.jpg",

      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGB9AfrtqkJsgzm2BuQV4FI_Xi6TEBSqho-w&s",
      "https://c8.alamy.com/comp/BBKAFE/garbage-collection-india-tamil-nadu-madurai-no-releases-available-BBKAFE.jpg",
    ],
  },
  {
    name: "Neha Kapoor",
    emailId: "neha.kapoor@example.com",
    address: {
      addressLine: "Sector 56",
      coordinates: [77.1004, 28.4383],
      city: "Gurgaon",
      state: "Haryana",
      country: "India",
      zipcode: "122011",
    },
    assignedTo: null,
    currentStatus: "In Progress",
    comments: "Road repair needed.",
    images: [
      "https://t3.ftcdn.net/jpg/00/52/48/66/360_F_52486643_JZL97JZ9tKzTGWO7RU3wf2ZvOZ9LjcPs.jpg",
      "https://images.hindustantimes.com/rf/image_size_960x540/HT/p2/2017/01/25/Pictures/india-environment-waste-social_c8ebb536-e2bc-11e6-95da-c88e93771820.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDdhKPcv0Zdy139Yrq2-TPB_rgrFVWev9Xng&s",
    ],
  },
  {
    name: "Arjun Bhatia",
    emailId: "arjun.bhatia@example.com",
    address: {
      addressLine: "Golf Course Road",
      coordinates: [77.1094, 28.4593],
      city: "Gurgaon",
      state: "Haryana",
      country: "India",
      zipcode: "122009",
    },
    assignedTo: null,
    currentStatus: "Resolved",
    comments: "Power outage.",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmYgycqqj4CeriE6TuWEP2zE6IpWl7Fd0tcg&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGB9AfrtqkJsgzm2BuQV4FI_Xi6TEBSqho-w&s",
      "https://c8.alamy.com/comp/BBKAFE/garbage-collection-india-tamil-nadu-madurai-no-releases-available-BBKAFE.jpg",
    ],
  },
  {
    name: "Sana Malik",
    emailId: "sana.malik@example.com",
    address: {
      addressLine: "Huda City Centre Metro Station",
      coordinates: [77.0728, 28.459],
      city: "Gurgaon",
      state: "Haryana",
      country: "India",
      zipcode: "122002",
    },
    assignedTo: null,
    currentStatus: "Active",
    comments: "Ticket vending machine not working.",
    images: [
      "https://t3.ftcdn.net/jpg/00/52/48/66/360_F_52486643_JZL97JZ9tKzTGWO7RU3wf2ZvOZ9LjcPs.jpg",

      "https://c8.alamy.com/comp/BBKAFE/garbage-collection-india-tamil-nadu-madurai-no-releases-available-BBKAFE.jpg",
    ],
  },
  {
    name: "Deepak Jain",
    emailId: "deepak.jain@example.com",
    address: {
      addressLine: "Sector 14 Market",
      coordinates: [77.0346, 28.4652],
      city: "Gurgaon",
      state: "Haryana",
      country: "India",
      zipcode: "122001",
    },
    assignedTo: null,
    currentStatus: "In Progress",
    comments: "Unauthorized street vendors.",
    images: [
      "https://t3.ftcdn.net/jpg/00/52/48/66/360_F_52486643_JZL97JZ9tKzTGWO7RU3wf2ZvOZ9LjcPs.jpg",

      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmYgycqqj4CeriE6TuWEP2zE6IpWl7Fd0tcg&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGB9AfrtqkJsgzm2BuQV4FI_Xi6TEBSqho-w&s",
      "https://c8.alamy.com/comp/BBKAFE/garbage-collection-india-tamil-nadu-madurai-no-releases-available-BBKAFE.jpg",
    ],
  },
  {
    name: "Pooja Nair",
    emailId: "pooja.nair@example.com",
    address: {
      addressLine: "Sector 50",
      coordinates: [77.0672, 28.4179],
      city: "Gurgaon",
      state: "Haryana",
      country: "India",
      zipcode: "122018",
    },
    assignedTo: null,
    currentStatus: "Resolved",
    comments: "Tree pruning needed.",
    images: [
      "https://t3.ftcdn.net/jpg/00/52/48/66/360_F_52486643_JZL97JZ9tKzTGWO7RU3wf2ZvOZ9LjcPs.jpg",
      "https://images.hindustantimes.com/rf/image_size_960x540/HT/p2/2017/01/25/Pictures/india-environment-waste-social_c8ebb536-e2bc-11e6-95da-c88e93771820.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDdhKPcv0Zdy139Yrq2-TPB_rgrFVWev9Xng&s",

      "https://c8.alamy.com/comp/BBKAFE/garbage-collection-india-tamil-nadu-madurai-no-releases-available-BBKAFE.jpg",
    ],
  },
  {
    name: "Rakesh Kumar",
    emailId: "rakesh.kumar@example.com",
    address: {
      addressLine: "DLF Phase 1",
      coordinates: [77.0893, 28.4797],
      city: "Gurgaon",
      state: "Haryana",
      country: "India",
      zipcode: "122001",
    },
    assignedTo: null,
    currentStatus: "Active",
    comments: "Water supply issue.",
    images: [
      "https://t3.ftcdn.net/jpg/00/52/48/66/360_F_52486643_JZL97JZ9tKzTGWO7RU3wf2ZvOZ9LjcPs.jpg",
      "https://images.hindustantimes.com/rf/image_size_960x540/HT/p2/2017/01/25/Pictures/india-environment-waste-social_c8ebb536-e2bc-11e6-95da-c88e93771820.jpg",

      "https://c8.alamy.com/comp/BBKAFE/garbage-collection-india-tamil-nadu-madurai-no-releases-available-BBKAFE.jpg",
    ],
  },
  {
    name: "Shreya Pandey",
    emailId: "shreya.pandey@example.com",
    address: {
      addressLine: "Sector 45",
      coordinates: [77.0711, 28.4518],
      city: "Gurgaon",
      state: "Haryana",
      country: "India",
      zipcode: "122003",
    },
    assignedTo: null,
    currentStatus: "In Progress",
    comments: "Street dogs menace.",
    images: [
      "https://t3.ftcdn.net/jpg/00/52/48/66/360_F_52486643_JZL97JZ9tKzTGWO7RU3wf2ZvOZ9LjcPs.jpg",
      "https://images.hindustantimes.com/rf/image_size_960x540/HT/p2/2017/01/25/Pictures/india-environment-waste-social_c8ebb536-e2bc-11e6-95da-c88e93771820.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDdhKPcv0Zdy139Yrq2-TPB_rgrFVWev9Xng&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmYgycqqj4CeriE6TuWEP2zE6IpWl7Fd0tcg&s",
    ],
  },
  {
    name: "Varun Rao",
    emailId: "varun.rao@example.com",
    address: {
      addressLine: "Sector 23",
      coordinates: [77.0324, 28.5135],
      city: "Gurgaon",
      state: "Haryana",
      country: "India",
      zipcode: "122017",
    },
    assignedTo: null,
    currentStatus: "Resolved",
    comments: "Illegal parking.",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDdhKPcv0Zdy139Yrq2-TPB_rgrFVWev9Xng&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmYgycqqj4CeriE6TuWEP2zE6IpWl7Fd0tcg&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGB9AfrtqkJsgzm2BuQV4FI_Xi6TEBSqho-w&s",
      "https://c8.alamy.com/comp/BBKAFE/garbage-collection-india-tamil-nadu-madurai-no-releases-available-BBKAFE.jpg",
    ],
  },
  {
    name: "Megha Jain",
    emailId: "megha.jain@example.com",
    address: {
      addressLine: "Galleria Market",
      coordinates: [77.0806, 28.4801],
      city: "Gurgaon",
      state: "Haryana",
      country: "India",
      zipcode: "122009",
    },
    assignedTo: null,
    currentStatus: "Active",
    comments: "Noisy construction work.",
    images: [
      "https://t3.ftcdn.net/jpg/00/52/48/66/360_F_52486643_JZL97JZ9tKzTGWO7RU3wf2ZvOZ9LjcPs.jpg",

      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmYgycqqj4CeriE6TuWEP2zE6IpWl7Fd0tcg&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGB9AfrtqkJsgzm2BuQV4FI_Xi6TEBSqho-w&s",
      "https://c8.alamy.com/comp/BBKAFE/garbage-collection-india-tamil-nadu-madurai-no-releases-available-BBKAFE.jpg",
    ],
  },
  {
    name: "Siddharth Roy",
    emailId: "siddharth.roy@example.com",
    address: {
      addressLine: "Sector 4",
      coordinates: [77.0221, 28.4675],
      city: "Gurgaon",
      state: "Haryana",
      country: "India",
      zipcode: "122001",
    },
    assignedTo: null,
    currentStatus: "In Progress",
    comments: "Drainage clogging.",
    images: [
      "https://t3.ftcdn.net/jpg/00/52/48/66/360_F_52486643_JZL97JZ9tKzTGWO7RU3wf2ZvOZ9LjcPs.jpg",
      "https://images.hindustantimes.com/rf/image_size_960x540/HT/p2/2017/01/25/Pictures/india-environment-waste-social_c8ebb536-e2bc-11e6-95da-c88e93771820.jpg",

      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGB9AfrtqkJsgzm2BuQV4FI_Xi6TEBSqho-w&s",
      "https://c8.alamy.com/comp/BBKAFE/garbage-collection-india-tamil-nadu-madurai-no-releases-available-BBKAFE.jpg",
    ],
  },
  {
    name: "Ritika Agarwal",
    emailId: "ritika.agarwal@example.com",
    address: {
      addressLine: "DLF Phase 3",
      coordinates: [77.0998, 28.4983],
      city: "Gurgaon",
      state: "Haryana",
      country: "India",
      zipcode: "122010",
    },
    assignedTo: null,
    currentStatus: "Resolved",
    comments: "Broken streetlight.",
    images: [
      "https://t3.ftcdn.net/jpg/00/52/48/66/360_F_52486643_JZL97JZ9tKzTGWO7RU3wf2ZvOZ9LjcPs.jpg",
      "https://images.hindustantimes.com/rf/image_size_960x540/HT/p2/2017/01/25/Pictures/india-environment-waste-social_c8ebb536-e2bc-11e6-95da-c88e93771820.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDdhKPcv0Zdy139Yrq2-TPB_rgrFVWev9Xng&s",

      "https://c8.alamy.com/comp/BBKAFE/garbage-collection-india-tamil-nadu-madurai-no-releases-available-BBKAFE.jpg",
    ],
  },
  {
    name: "Gaurav Mishra",
    emailId: "gaurav.mishra@example.com",
    address: {
      addressLine: "Medanta - The Medicity",
      coordinates: [77.0444, 28.4265],
      city: "Gurgaon",
      state: "Haryana",
      country: "India",
      zipcode: "122001",
    },
    assignedTo: null,
    currentStatus: "Active",
    comments: "Parking issue.",
    images: [
      "https://t3.ftcdn.net/jpg/00/52/48/66/360_F_52486643_JZL97JZ9tKzTGWO7RU3wf2ZvOZ9LjcPs.jpg",
      "https://images.hindustantimes.com/rf/image_size_960x540/HT/p2/2017/01/25/Pictures/india-environment-waste-social_c8ebb536-e2bc-11e6-95da-c88e93771820.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDdhKPcv0Zdy139Yrq2-TPB_rgrFVWev9Xng&s",

      "https://c8.alamy.com/comp/BBKAFE/garbage-collection-india-tamil-nadu-madurai-no-releases-available-BBKAFE.jpg",
    ],
  },
  {
    name: "Aditi Chawla",
    emailId: "aditi.chawla@example.com",
    address: {
      addressLine: "Sector 21",
      coordinates: [77.0531, 28.5306],
      city: "Gurgaon",
      state: "Haryana",
      country: "India",
      zipcode: "122016",
    },
    assignedTo: null,
    currentStatus: "In Progress",
    comments: "Water logging.",
    images: [
      "https://t3.ftcdn.net/jpg/00/52/48/66/360_F_52486643_JZL97JZ9tKzTGWO7RU3wf2ZvOZ9LjcPs.jpg",
      "https://images.hindustantimes.com/rf/image_size_960x540/HT/p2/2017/01/25/Pictures/india-environment-waste-social_c8ebb536-e2bc-11e6-95da-c88e93771820.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDdhKPcv0Zdy139Yrq2-TPB_rgrFVWev9Xng&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmYgycqqj4CeriE6TuWEP2zE6IpWl7Fd0tcg&s",
    ],
  },
];

const colors = {
  person: "#1c4ecb",
  event: "#6319b8",
  action: "#ca7e0ccc",
  organization: "#D84C4CCC",
  claim: "#dc2222cc",
  law: "#16ae0ecc",
  place: "#bca316cc",
};

const colorList = Object.values(colors);
const getColorByIndex = (index) => colorList[index % colorList.length];

const Map = ({ data }) => {
  const mapViewData = useMemo(() => {
    let items = data?.mapview || [];
    items
      .map((d) => {
        if (!d.coordinates) return null;
        return { ...d, coordinates: [d.coordinates[1], d.coordinates[0]] };
      })
      .filter((a) => a);
    return items;
  }, [data?.mapview]);

  const mapContainerRef = useRef();
  const mapRef = useRef();
  const [activeItem, setActiveItem] = useState(null);

  function findGeographicalCenter() {
    const coordinates = mapViewData.map((complaint) => complaint.coordinates);
    if (!coordinates.length) return [77.071925, 28.466795];

    console.log(coordinates);
    let sumLat = 0;
    let sumLong = 0;

    coordinates.forEach((coord) => {
      sumLat += coord[0];
      sumLong += coord[1];
    });

    const centerLat = sumLat / coordinates.length;
    const centerLong = sumLong / coordinates.length;

    return [centerLong, centerLat];
  }

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoic2FyZmFyYWphbnNhcmkiLCJhIjoiY2x6N2g0ajhpMDlsbDJpczU1bXg3eWZnYyJ9.jighMm4Fry74CsAHXQ7okw";

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: findGeographicalCenter(),
      zoom: 4,
      pitch: 42,
      bearing: -50,
      style: "mapbox://styles/mapbox/standard",
    });

    mapRef.current.on("style.load", () => {
      setTimeout(() => {
        const setStyle = () => {
          try {
            mapRef.current.setConfigProperty("basemap", "lightPreset", "dusk");
          } catch (err) {
            setTimeout(() => {
              setStyle();
            }, 1000);
          }
        };
        setStyle();

        // mapRef.current.setConfigProperty('basemap', 'lightPreset', 'dusk');
      }, 6000);
    });
    mapViewData.forEach((item, i) => {
      // if (item.location !== "Bangalore City Civil Court") return;

      console.log(item);
      const marker = new mapboxgl.Marker({
        color: getColorByIndex(i),
        rotation: 30,
      })
        .setLngLat([item.coordinates[1], item.coordinates[0]])

        .addTo(mapRef.current);

      marker.getElement().addEventListener("click", (e) => {
        // console.log(JSON.stringify(item));
        setActiveItem({ ...item });
        e.stopPropagation();
      });
    });

    document.onclick = () => {
      setActiveItem(null);
    };
  }, [mapViewData]);

  return (
    <>
      <div id="map" style={{ height: "100%" }} ref={mapContainerRef} />
      <LocationEvent complaint={activeItem} setComplaint={setActiveItem} />
    </>
  );
};

export default Map;
