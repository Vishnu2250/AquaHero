import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Image,
  Dimensions,
  ImageBackground,
  StatusBar,
  Platform
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

const { width } = Dimensions.get("window");

// --- REUSABLE COMPONENTS ---

const TopHeader = ({ title, onBack }) => (
  <View style={styles.headerContainer}>
    <TouchableOpacity onPress={onBack} style={styles.headerBackBtn}>
      <Text style={styles.headerBackTxt}>← BACK</Text>
    </TouchableOpacity>
    <Text style={styles.headerTitle}>{title}</Text>
    <View style={{ width: 80 }} />
  </View>
);

const MenuButton = ({ title, emoji, color, onPress }) => (
  <TouchableOpacity style={[styles.menuCard, { borderColor: color }]} onPress={onPress}>
    <Text style={{fontSize: 40, marginBottom: 10}}>{emoji}</Text>
    <Text style={styles.menuText}>{title}</Text>
  </TouchableOpacity>
);

export default function App() {
  const [screen, setScreen] = useState("login");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [points, setPoints] = useState(0);

  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState("");
  const [wasteType, setWasteType] = useState("Dry");

  const addPoints = (n) => setPoints((prev) => prev + n);

  // --- DATA: 10 LEARNING MODULES (LOCAL ASSETS) ---
  const learningData = [
    { id: 1, title: "Composting", desc: "Turn organic waste into nutrient-rich soil.", img: require("./assets/composting.png") },
    { id: 2, title: "Rainwater", desc: "Harvest rain to recharge groundwater levels.", img: require("./assets/rainwater.jpg") },
    { id: 3, title: "Zero Waste", desc: "Minimize your trash footprint every day.", img: require("./assets/Zero Waste.jpg") },
    { id: 4, title: "Plastic Free", desc: "Say no to single-use plastics for clean oceans.", img: require("./assets/Plastic Free.jpg") },
    { id: 5, title: "Solar Power", desc: "Utilize clean energy from the sun.", img: require("./assets/Solar Power.jpg") },
    { id: 6, title: "Grey Water", desc: "Reuse household water for gardening.", img: require("./assets/Grey Water.jpg") },
    { id: 7, title: "Segregation", desc: "Sort waste at the source for better recycling.", img: require("./assets/Segregation.jpg") },
    { id: 8, title: "Ocean Care", desc: "Protect marine life from chemical pollution.", img: require("./assets/Ocean Care.jpg") },
    { id: 9, title: "Soil Health", desc: "Prevent erosion and maintain earth nutrients.", img: require("./assets/Soil Health.jpg") },
    { id: 10, title: "Eco Fashion", desc: "Choose sustainable fabrics over fast fashion.", img: require("./assets/Eco-Fashion.jpg") },
  ];

  // --- DATA: 10 REWARDS (LOCAL ASSETS) ---
  const rewardsData = [
    { id: 1, n: "Eco Tote Bag", p: 100, img: require("./assets/Eco Tote Bag.jpg") },
    { id: 2, n: "Bamboo Toothbrush", p: 200, img: require("./assets/Bamboo Toothbrush.jpg") },
    { id: 3, n: "Steel Water Bottle", p: 500, img: require("./assets/Steel Water Bottle.jpg") },
    { id: 4, n: "Natural Sapling", p: 150, img: require("./assets/Natural Saplin.jpg") },
    { id: 5, n: "Solar Desk Lamp", p: 1200, img: require("./assets/Solar Desk Lamp.jpg") },
    { id: 6, n: "Recycled Diary", p: 300, img: require("./assets/Recycled Diary.jpg") },
    { id: 7, n: "Clay Water Pot", p: 800, img: require("./assets/Clay Water Pot.jpg") },
    { id: 8, n: "Handmade Soap", p: 250, img: require("./assets/Handmade Soap.jpg") },
    { id: 9, n: "Jute Lunch Box", p: 600, img: require("./assets/Jute Lunch Box.jpg") },
    { id: 10, n: "Copper Bottle", p: 1500, img: require("./assets/Copper Bottle.jpg") },
  ];

  /* 1. LOGIN SCREEN (WITH YOUR REQUESTED BACKGROUND) */
  if (screen === "login") {
    return (
      <View style={styles.full}>
        <StatusBar translucent backgroundColor="transparent" />
        <ImageBackground source={require("./assets/stay hydrated.jpg")} style={styles.bg}>
          <View style={styles.darkOverlay}>
            <Text style={styles.heroTitle}>AQUAHERO</Text>
            <View style={styles.loginCard}>
              <TextInput placeholder="Full Name" style={styles.input} value={name} onChangeText={setName} />
              <TextInput placeholder="Mobile Number" style={styles.input} keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
              <TouchableOpacity style={styles.btnPrimary} onPress={() => name && phone.length >= 10 ? setScreen("home") : Alert.alert("Required", "Please enter name and 10 digit phone number")}>
                <Text style={styles.btnTxtWhite}>GET STARTED</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }

  /* 2. HOME SCREEN */
  if (screen === "home") {
    return (
      <SafeAreaView style={styles.androidSafe}>
        <ScrollView style={styles.pad20}>
          <View style={styles.homeHeader}>
            <Text style={styles.welcomeTxt}>Welcome, {name} ✨</Text>
            <TouchableOpacity onPress={() => setScreen("login")}><Text style={{ color: '#e74c3c', fontWeight: 'bold' }}>Logout</Text></TouchableOpacity>
          </View>
          <View style={styles.pointsBanner}>
            <Text style={styles.pointsLabel}>TOTAL IMPACT POINTS</Text>
            <Text style={styles.pointsValue}>⭐ {points} PTS</Text>
          </View>
          <View style={styles.gridContainer}>
            <MenuButton title="Learn" emoji="📚" color="#3498db" onPress={() => setScreen("learn")} />
            <MenuButton title="Quiz" emoji="📝" color="#f39c12" onPress={() => setScreen("quiz")} />
            <MenuButton title="Pickup" emoji="🚛" color="#27ae60" onPress={() => setScreen("pickup")} />
            <MenuButton title="Rewards" emoji="🎁" color="#9b59b6" onPress={() => setScreen("reward")} />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  /* 3. LEARN SCREEN */
  if (screen === "learn") {
    return (
      <View style={styles.androidSafe}>
        <TopHeader title="Education" onBack={() => setScreen("home")} />
        <ScrollView style={styles.pad20}>
          {learningData.map((item) => (
            <View key={item.id} style={styles.infoCard}>
              <Image source={item.img} style={styles.infoImg} />
              <View style={styles.infoContent}>
                <Text style={styles.infoTitle}>{item.title}</Text>
                <Text style={styles.infoDesc}>{item.desc}</Text>
              </View>
            </View>
          ))}
          <TouchableOpacity style={styles.btnPrimary} onPress={() => { addPoints(50); setScreen("home"); Alert.alert("Success", "+50 points for learning!"); }}>
            <Text style={styles.btnTxtWhite}>FINISH MODULE</Text>
          </TouchableOpacity>
          <View style={{ height: 40 }} />
        </ScrollView>
      </View>
    );
  }

  /* 4. PICKUP SCREEN */
  if (screen === "pickup") {
    const handleCapture = async () => {
      let { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") { Alert.alert("Error", "Need camera permission"); return; }
      let res = await ImagePicker.launchCameraAsync({ quality: 0.5, allowsEditing: true });
      if (!res.canceled) {
        setPhoto(res.assets[0].uri);
        let locPerm = await Location.requestForegroundPermissionsAsync();
        if (locPerm.status === "granted") {
          let gps = await Location.getCurrentPositionAsync({});
          setLocation(`${gps.coords.latitude.toFixed(4)}, ${gps.coords.longitude.toFixed(4)}`);
        }
      }
    };

    return (
      <View style={styles.androidSafe}>
        <TopHeader title="Schedule Pickup" onBack={() => setScreen("home")} />
        <ScrollView style={styles.pad20}>
          <Text style={styles.labelTitle}>Waste Type</Text>
          <View style={styles.rowBetween}>
            <TouchableOpacity style={[styles.typeSelection, wasteType === "Dry" && styles.activeTypeSelection]} onPress={() => setWasteType("Dry")}>
              <Text style={wasteType === "Dry" ? { color: "#fff" } : {}}>♻ Dry Waste</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.typeSelection, wasteType === "Wet" && styles.activeTypeSelection]} onPress={() => setWasteType("Wet")}>
              <Text style={wasteType === "Wet" ? { color: "#fff" } : {}}>🍌 Wet Waste</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.actionBtn} onPress={handleCapture}>
            <Text style={styles.btnTxtWhite}>📷 CAPTURE PHOTO</Text>
          </TouchableOpacity>
          {photo && <Image source={{ uri: photo }} style={styles.previewImage} />}
          {location !== "" && <View style={styles.locBadge}><Text style={{ color: "#27ae60", fontWeight: "bold" }}>📍 {location}</Text></View>}
          <View style={styles.collectorCard}>
            <Text style={styles.collectorName}>Collector: Arul Mani</Text>
            <Text>📞 +91 9876543210</Text>
          </View>
          <TouchableOpacity style={styles.btnPrimary} onPress={() => { if (!photo) return Alert.alert("Wait", "Capture photo first"); addPoints(100); setScreen("home"); Alert.alert("Confirmed", "Pickup Scheduled!"); }}>
            <Text style={styles.btnTxtWhite}>CONFIRM (+100 PTS)</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  /* 5. REWARDS SCREEN */
  if (screen === "reward") {
    const claim = (item) => {
      if (points < item.p) { Alert.alert("Low Points", `You need ${item.p - points} more`); return; }
      setPoints(points - item.p);
      Alert.alert("Success", `${item.n} Claimed!`);
    };
    return (
      <View style={styles.androidSafe}>
        <TopHeader title="Rewards" onBack={() => setScreen("home")} />
        <View style={styles.addressBanner}><Text style={styles.addressTxt}>📍 Collect at Pondicherry University Gate 2</Text></View>
        <ScrollView contentContainerStyle={styles.rewardGridItems}>
          {rewardsData.map((item) => (
            <View key={item.id} style={styles.rewardBox}>
              <Image source={item.img} style={styles.rewardThumb} />
              <Text style={styles.rewardLabel}>{item.n}</Text>
              <Text style={styles.rewardCost}>{item.p} PTS</Text>
              <TouchableOpacity style={[styles.claimButton, points < item.p && { backgroundColor: "#ccc" }]} onPress={() => claim(item)}>
                <Text style={styles.btnTxtWhite}>Claim</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }

  /* 6. QUIZ SCREEN */
  if (screen === "quiz") {
    return <QuizScreen addPoints={addPoints} onBack={() => setScreen("home")} />;
  }
}

// --- QUIZ COMPONENT (FULL 100 QUESTIONS) ---
function QuizScreen({ addPoints, onBack }) {
  const [idx, setIdx] = useState(0);
  const [sel, setSel] = useState(null);
  const [score, setScore] = useState(0);

  const questions = [
    ["Which bin for banana peel?", ["Green", "Blue", "Red"], 0],
    ["Plastic is usually?", ["Wet Waste", "Dry Waste", "Food Waste"], 1],
    ["Rainwater harvesting saves?", ["Groundwater", "Clouds", "Ocean salt"], 0],
    ["Compost is best for?", ["Fuel", "Soil Health", "Construction"], 1],
    ["Sustainable bag material?", ["Plastic", "Cloth/Jute", "Paper"], 1],
    ["Steel bottles are?", ["Single-use", "Reusable", "Dangerous"], 1],
    ["Grey water usage?", ["Drinking", "Gardening", "Cooking"], 1],
    ["Eco-friendly light source?", ["Solar Power", "Coal Power", "Diesel"], 0],
    ["Recycling means?", ["Throwing away", "Processing waste", "Burning"], 1],
    ["Water is a?", ["Unlimited resource", "Finite resource", "Artificial"], 1],
    ["Paper comes from?", ["Rocks", "Trees", "Ocean"], 1],
    ["Ocean pollution mostly from?", ["Fish", "Plastic waste", "Seaweed"], 1],
    ["Vegetable skins go in?", ["Blue bin", "Green bin", "Red bin"], 1],
    ["Zero Water Day promotes?", ["Wasting water", "Saving water", "Salt water"], 1],
    ["Is glass recyclable?", ["Yes", "No", "Only once"], 0],
    ["E-waste examples?", ["Batteries/Phones", "Paper/Cloth", "Food"], 0],
    ["Best way to save tap water?", ["Keep it running", "Fix leaks", "Use high pressure"], 1],
    ["Biodegradable means?", ["Breaks down naturally", "Never decays", "Toxic"], 0],
    ["Segregation means?", ["Mixing waste", "Separating waste", "Burning"], 1],
    ["LED bulbs save?", ["Water", "Energy", "Weight"], 1],
    ["Hazardous waste?", ["Banana peel", "Chemicals", "Cardboard"], 1],
    ["Global warming cause?", ["Planting trees", "CO2 emissions", "Clean energy"], 1],
    ["Drip irrigation is?", ["Efficient", "Wasteful", "Expensive"], 0],
    ["Microplastics found in?", ["Clouds", "Oceans", "Moon"], 1],
    ["Soil erosion prevention?", ["Cutting trees", "Planting trees", "Paving"], 1],
    ["Compost turns into?", ["Glass", "Nutrient-rich soil", "Plastic"], 1],
    ["Organic farming uses?", ["Chemicals", "Natural fertilizers", "Plastics"], 1],
    ["Vermicompost uses?", ["Worms", "Fire", "Machines"], 0],
    ["Is Aluminum recyclable?", ["No", "Yes", "Only in space"], 1],
    ["Main source of drinking water?", ["Oceans", "Rivers/Aquifers", "Swimming pools"], 1],
    ["Polluted water causes?", ["Strength", "Diseases", "Intelligence"], 1],
    ["Afforestation means?", ["Cutting trees", "Planting forests", "Farming"], 1],
    ["R in 'Reduce' stands for?", ["Recycle", "Remove", "Relax"], 0],
    ["Is styrofoam eco-friendly?", ["Yes", "No", "Maybe"], 1],
    ["Greenhouse effect heats?", ["Deep sea", "Earth's surface", "Stars"], 1],
    ["Renewable energy?", ["Wind", "Oil", "Gas"], 0],
    ["Which is 'Dry' waste?", ["Curd", "Glass bottle", "Tea leaves"], 1],
    ["Solar energy comes from?", ["Rain", "Sun", "Wind"], 1],
    ["Acid rain is caused by?", ["Pollution", "Clean air", "Salt"], 0],
    ["Water vapor is a?", ["Solid", "Liquid", "Gas"], 2],
    ["Glaciers are made of?", ["Salt water", "Fresh water", "Lava"], 1],
    ["Aquifer is?", ["Underground water", "A fish", "A cloud"], 0],
    ["Main component of air?", ["Oxygen", "Nitrogen", "Carbon"], 1],
    ["Does meat use more water?", ["Yes", "No", "Same as veg"], 0],
    ["Upcycling means?", ["Making better items", "Throwing up", "Cycling faster"], 0],
    ["Is cotton biodegradable?", ["Yes", "No", "Only white cotton"], 0],
    ["Deforestation causes?", ["Rain", "Soil loss", "Oxygen"], 1],
    ["Water cycle involves?", ["Evaporation", "Cooking", "Driving"], 0],
    ["CFCs damage which layer?", ["Soil", "Ozone", "Rock"], 1],
    ["Is rain water pure?", ["Mostly", "Never", "Always salty"], 0],
    ["Over-irrigation leads to?", ["Salinity", "Better crops", "Nothing"], 0],
    ["Plastic bags should be?", ["Burned", "Avoided", "Buried"], 1],
    ["Wetlands act as?", ["Filters", "Deserts", "Parking"], 0],
    ["Most energy in homes for?", ["Lights", "Heating/Cooling", "Radio"], 1],
    ["Ecosystem means?", ["Technology", "Living & Non-living", "Business"], 1],
    ["Carbon footprint is?", ["Your shoe size", "GHG emissions", "Coal dust"], 1],
    ["Tidal energy from?", ["Sun", "Moon/Tides", "Wind"], 1],
    ["Sanitary waste goes in?", ["Red/Hazardous bin", "Green bin", "Blue bin"], 0],
    ["Washing clothes saves water if?", ["Full loads", "Half loads", "Cold water"], 0],
    ["Primary consumer?", ["Tiger", "Deer", "Grass"], 1],
    ["Photosynthesis gives?", ["CO2", "Oxygen", "Smoke"], 1],
    ["Hydroponics is?", ["Soil-less farming", "Deep sea diving", "Watering"], 0],
    ["Is paper recycling infinite?", ["Yes", "No", "5-7 times"], 2],
    ["E-waste should be?", ["Thrown in bin", "Given to recyclers", "Buried"], 1],
    ["Incineration means?", ["Burying", "Burning", "Mixing"], 1],
    ["Biodiversity means?", ["One species", "Variety of life", "Computers"], 1],
    ["Is copper recyclable?", ["Yes", "No", "Sometimes"], 0],
    ["Littering harms?", ["Wildlife", "Nobody", "Only ants"], 0],
    ["A vegan diet uses?", ["More water", "Less water", "Same water"], 1],
    ["Eco-labeling means?", ["Price tag", "Environmental claim", "Designer"], 1],
    ["Earth Day date?", ["April 22", "May 1", "June 5"], 0],
    ["World Water Day?", ["March 22", "Dec 25", "Jan 1"], 0],
    ["Main gas in Greenhouse?", ["Oxygen", "Methane", "Nitrogen"], 1],
    ["Coral reefs are?", ["Rocks", "Living animals", "Plants"], 1],
    ["Threat to polar bears?", ["Melting ice", "Too much fish", "Cold"], 0],
    ["Is local food better?", ["Yes(less transport)", "No", "Same"], 0],
    ["Rainwater pH is?", ["Slightly acidic", "Very basic", "Exactly 14"], 0],
    ["Fossil fuels include?", ["Coal/Oil", "Sun/Wind", "Wood"], 0],
    ["Geothermal energy from?", ["Clouds", "Earth's core", "Ocean"], 1],
    ["Bamboo is a?", ["Tree", "Grass", "Flower"], 1],
    ["Avoid 'Fast Fashion' because?", ["It's cheap", "High waste/pollution", "It's fast"], 1],
    ["Is PVC safe to burn?", ["Yes", "No (toxic)", "Maybe"], 1],
    ["Desalination removes?", ["Salt", "Dirt", "Fish"], 0],
    ["Drought means?", ["Too much rain", "Lack of water", "Snow"], 1],
    ["Can you recycle pizza boxes?", ["Always", "No(grease)", "Yes"], 1],
    ["Is milk carton recyclable?", ["Yes", "No", "Sometimes"], 2],
    ["LED stands for?", ["Light Emitting Diode", "Long Electric Device", "None"], 0],
    ["Best car for Earth?", ["Diesel", "Electric", "Hummer"], 1],
    ["Sustainability goal?", ["Balance needs", "Use all resources", "Profit"], 0],
    ["Is silk eco-friendly?", ["Natural fiber", "Plastic", "Metal"], 0],
    ["Methane comes from?", ["Cows/Landfills", "Bikes", "Paper"], 0],
    ["Desertification is?", ["Making cake", "Land turning to desert", "Rain"], 1],
    ["Groundwater is found in?", ["Rocks/Soil", "Clouds", "Rivers"], 0],
    ["Is it okay to dump oil in sink?", ["Yes", "No(clogs/pollutes)", "Only veg oil"], 1],
    ["One tree produces oxygen for?", ["2 people", "100 people", "No one"], 0],
    ["Can you compost meat?", ["Yes", "Not recommended(pests)", "Always"], 1],
    ["Most recycled metal?", ["Gold", "Aluminum", "Lead"], 1],
    ["Is 'Zero Waste' a lifestyle?", ["Yes", "No", "Only for shops"], 0],
    ["Recycled paper uses?", ["Less energy", "More energy", "Same energy"], 0],
    ["Is the Ozone hole healing?", ["Yes", "No", "Never existed"], 0],
  ];

  const handleNext = () => {
    if (idx < questions.length - 1) { setIdx(idx + 1); setSel(null); }
    else { addPoints(score); onBack(); Alert.alert("Quiz Finished", `Total points earned: ${score}`); }
  };

  const q = questions[idx];

  return (
    <View style={styles.androidSafe}>
      <TopHeader title={`Quiz ${idx + 1}/100`} onBack={onBack} />
      <ScrollView style={styles.pad20}>
        <Text style={styles.questionTxt}>{q[0]}</Text>
        {q[1].map((o, i) => {
          let bg = "#2c3e50";
          if (sel !== null) { if (i === q[2]) bg = "#27ae60"; else if (i === sel) bg = "#e74c3c"; }
          return (
            <TouchableOpacity key={i} style={[styles.quizOpt, { backgroundColor: bg }]} onPress={() => { if (sel === null) { setSel(i); if (i === q[2]) setScore(score + 10); } }}>
              <Text style={styles.btnTxtWhite}>{o}</Text>
            </TouchableOpacity>
          );
        })}
        {sel !== null && <TouchableOpacity style={styles.btnPrimary} onPress={handleNext}><Text style={styles.btnTxtWhite}>CONTINUE</Text></TouchableOpacity>}
      </ScrollView>
    </View>
  );
}

// --- STYLES ---
const styles = StyleSheet.create({
  full: { flex: 1 },
  androidSafe: { flex: 1, backgroundColor: '#f9f9f9', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  bg: { flex: 1, justifyContent: 'center' },
  darkOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', padding: 25, justifyContent: 'center' },
  heroTitle: { fontSize: 34, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginBottom: 40 },
  loginCard: { backgroundColor: '#fff', padding: 20, borderRadius: 20 },
  input: { backgroundColor: '#f1f2f6', padding: 15, borderRadius: 10, marginBottom: 15 },
  btnPrimary: { backgroundColor: '#27ae60', padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  btnTxtWhite: { color: '#fff', fontWeight: 'bold' },
  pad20: { padding: 20 },
  homeHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  welcomeTxt: { fontSize: 22, fontWeight: 'bold' },
  pointsBanner: { backgroundColor: '#16a085', padding: 25, borderRadius: 20, alignItems: 'center', marginBottom: 25 },
  pointsLabel: { color: '#fff', fontSize: 12 },
  pointsValue: { color: '#fff', fontSize: 36, fontWeight: 'bold' },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  menuCard: { width: '48%', backgroundColor: '#fff', padding: 20, borderRadius: 15, alignItems: 'center', marginBottom: 15, borderWidth: 1.5 },
  menuText: { fontWeight: 'bold', fontSize: 16 },
  headerContainer: { height: 65, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#eee' },
  headerBackBtn: { width: 80, paddingLeft: 15 },
  headerBackTxt: { color: '#3498db', fontWeight: 'bold' },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  infoCard: { backgroundColor: '#fff', borderRadius: 15, marginBottom: 20, overflow: 'hidden', elevation: 3 },
  infoImg: { width: '100%', height: 180 },
  infoContent: { padding: 15 },
  infoTitle: { fontSize: 20, fontWeight: 'bold', color: '#2c3e50' },
  infoDesc: { fontSize: 14, color: '#7f8c8d', marginTop: 5 },
  addressBanner: { backgroundColor: '#f39c12', padding: 10 },
  addressTxt: { color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 12 },
  rewardGridItems: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', padding: 10 },
  rewardBox: { width: width * 0.44, backgroundColor: '#fff', padding: 10, borderRadius: 15, marginBottom: 15, alignItems: 'center' },
  rewardThumb: { width: '100%', height: 110, borderRadius: 10 },
  rewardLabel: { fontWeight: 'bold', marginTop: 8, textAlign: 'center' },
  rewardCost: { color: '#d35400', fontSize: 12, fontWeight: 'bold' },
  claimButton: { backgroundColor: '#27ae60', padding: 8, width: '100%', borderRadius: 8, alignItems: 'center', marginTop: 5 },
  labelTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  typeSelection: { width: '48%', padding: 15, backgroundColor: '#fff', borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#ddd' },
  activeTypeSelection: { backgroundColor: '#27ae60', borderColor: '#27ae60' },
  actionBtn: { backgroundColor: '#34495e', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 15 },
  previewImage: { width: '100%', height: 200, borderRadius: 15, marginBottom: 10 },
  locBadge: { backgroundColor: '#e8f5e9', padding: 10, borderRadius: 10, marginBottom: 15, alignItems: 'center' },
  collectorCard: { backgroundColor: '#fff', padding: 15, borderRadius: 15, marginBottom: 20 },
  collectorName: { fontWeight: 'bold' },
  questionTxt: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 25 },
  quizOpt: { padding: 16, borderRadius: 12, marginBottom: 12, alignItems: 'center' }
});