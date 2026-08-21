export interface DistrictInfo {
  name: string;
  division: string;
  upazilas: string[];
}

export const BANGLADESH_DISTRICTS: DistrictInfo[] = [
  // Dhaka Division
  {
    name: 'Dhaka',
    division: 'Dhaka',
    upazilas: ['Dhanmondi', 'Mirpur', 'Uttara', 'Gulshan', 'Mohammadpur', 'Motijheel', 'Banani', 'Savar', 'Dhamrai', 'Keraniganj', 'Tejgaon', 'Badda', 'Khilgaon', 'Jatrabari', 'Shahbagh', 'Old Dhaka']
  },
  {
    name: 'Gazipur',
    division: 'Dhaka',
    upazilas: ['Gazipur Sadar', 'Kaliakair', 'Kapasia', 'Sreepur', 'Kaliganj', 'Tongi']
  },
  {
    name: 'Narayanganj',
    division: 'Dhaka',
    upazilas: ['Narayanganj Sadar', 'Bandar', 'Araihazar', 'Rupganj', 'Sonargaon']
  },
  {
    name: 'Tangail',
    division: 'Dhaka',
    upazilas: ['Tangail Sadar', 'Mirzapur', 'Gopalpur', 'Sakhipur', 'Madhupur', 'Ghatail', 'Kalihati', 'Delduar', 'Bhuapur']
  },
  {
    name: 'Faridpur',
    division: 'Dhaka',
    upazilas: ['Faridpur Sadar', 'Boalmari', 'Alfadanga', 'Madhukhali', 'Bhanga', 'Nagarkanda', 'Sadarpur']
  },
  {
    name: 'Manikganj',
    division: 'Dhaka',
    upazilas: ['Manikganj Sadar', 'Singair', 'Saturia', 'Ghior', 'Shivalaya', 'Harirampur', 'Daulatpur']
  },
  {
    name: 'Munshiganj',
    division: 'Dhaka',
    upazilas: ['Munshiganj Sadar', 'Sreenagar', 'Sirajdikhan', 'Louhajang', 'Tongibari', 'Gazaria']
  },
  {
    name: 'Narsingdi',
    division: 'Dhaka',
    upazilas: ['Narsingdi Sadar', 'Palash', 'Belabo', 'Monohardi', 'Raipura', 'Shibpur']
  },
  {
    name: 'Gopalganj',
    division: 'Dhaka',
    upazilas: ['Gopalganj Sadar', 'Kashiani', 'Kotalipara', 'Muksudpur', 'Tungipara']
  },
  {
    name: 'Madaripur',
    division: 'Dhaka',
    upazilas: ['Madaripur Sadar', 'Kalkini', 'Rajoir', 'Shibchar']
  },
  {
    name: 'Rajbari',
    division: 'Dhaka',
    upazilas: ['Rajbari Sadar', 'Baliakandi', 'Goalandaghat', 'Pangsha', 'Kalukhali']
  },
  {
    name: 'Shariatpur',
    division: 'Dhaka',
    upazilas: ['Shariatpur Sadar', 'Naria', 'Damudya', 'Bhedarganj', 'Zajira', 'Gosairhat']
  },
  {
    name: 'Kishoreganj',
    division: 'Dhaka',
    upazilas: ['Kishoreganj Sadar', 'Bhairab', 'Bajitpur', 'Katiadi', 'Kuliarchar', 'Pakundia', 'Hossainpur', 'Tarail', 'Karimganj']
  },

  // Chattogram Division
  {
    name: 'Chattogram',
    division: 'Chattogram',
    upazilas: ['Chattogram Sadar', 'Panchlaish', 'Agrabad', 'Khulshi', 'Halishahar', 'Hathazari', 'Sitakunda', 'Mirsharai', 'Patiya', 'Raozan', 'Rangunia', 'Anwara', 'Boalkhali', 'Sandwip']
  },
  {
    name: 'Cox\'s Bazar',
    division: 'Chattogram',
    upazilas: ['Cox\'s Bazar Sadar', 'Chakaria', 'Teknaf', 'Ukhiya', 'Ramu', 'Maheshkhali', 'Pekua', 'Kutubdia']
  },
  {
    name: 'Cumilla',
    division: 'Chattogram',
    upazilas: ['Cumilla Adarsha Sadar', 'Debidwar', 'Barura', 'Brahmanpara', 'Burichang', 'Chandina', 'Chauddagram', 'Daudkandi', 'Homna', 'Laksam', 'Muradnagar']
  },
  {
    name: 'Brahmanbaria',
    division: 'Chattogram',
    upazilas: ['Brahmanbaria Sadar', 'Ashuganj', 'Bancharampur', 'Kasba', 'Nabinagar', 'Nasirnagar', 'Sarail', 'Akhaura']
  },
  {
    name: 'Feni',
    division: 'Chattogram',
    upazilas: ['Feni Sadar', 'Chhagalnaiya', 'Daganbhuiyan', 'Parshuram', 'Fulgazi', 'Sonagazi']
  },
  {
    name: 'Noakhali',
    division: 'Chattogram',
    upazilas: ['Noakhali Sadar', 'Begumganj', 'Chatkhil', 'Companiganj', 'Hatiya', 'Senbagh', 'Sonaimuri', 'Subarnachar', 'Kabirhat']
  },
  {
    name: 'Chandpur',
    division: 'Chattogram',
    upazilas: ['Chandpur Sadar', 'Faridganj', 'Haimchar', 'Haziganj', 'Kachua', 'Matlab Dakshin', 'Matlab Uttar', 'Shahrasti']
  },
  {
    name: 'Lakshmipur',
    division: 'Chattogram',
    upazilas: ['Lakshmipur Sadar', 'Raipur', 'Ramganj', 'Ramgati', 'Kamalnagar']
  },
  {
    name: 'Rangamati',
    division: 'Chattogram',
    upazilas: ['Rangamati Sadar', 'Kaptai', 'Baghaichhari', 'Barkal', 'Langadu', 'Rajasthali', 'Belaichhari', 'Juraichhari', 'Naniarchar']
  },
  {
    name: 'Bandarban',
    division: 'Chattogram',
    upazilas: ['Bandarban Sadar', 'Alikadam', 'Lama', 'Naikhongchhari', 'Rowangchhari', 'Ruma', 'Thanchi']
  },
  {
    name: 'Khagrachhari',
    division: 'Chattogram',
    upazilas: ['Khagrachhari Sadar', 'Dighinala', 'Panchhari', 'Mahalchhari', 'Matiranga', 'Manikchhari', 'Ramgarh', 'Guimara']
  },

  // Sylhet Division
  {
    name: 'Sylhet',
    division: 'Sylhet',
    upazilas: ['Sylhet Sadar', 'Beanibazar', 'Golapganj', 'Companiganj', 'Fenchuganj', 'Bishwanath', 'Zakiganj', 'Kanaighat', 'Balaganj', 'Dakshin Surma', 'Osmani Nagar']
  },
  {
    name: 'Moulvibazar',
    division: 'Sylhet',
    upazilas: ['Moulvibazar Sadar', 'Sreemangal', 'Kamalganj', 'Kulaura', 'Rajnagar', 'Barlekha', 'Juri']
  },
  {
    name: 'Habiganj',
    division: 'Sylhet',
    upazilas: ['Habiganj Sadar', 'Bahubal', 'Madhabpur', 'Chunarughat', 'Nabiganj', 'Baniachong', 'Ajmiriganj', 'Lakhai']
  },
  {
    name: 'Sunamganj',
    division: 'Sylhet',
    upazilas: ['Sunamganj Sadar', 'Chhatak', 'Jagannathpur', 'Derai', 'Tahirpur', 'Dharampasha', 'Dowarabazar', 'Jamalganj', 'Shantiganj']
  },

  // Rajshahi Division
  {
    name: 'Rajshahi',
    division: 'Rajshahi',
    upazilas: ['Boalia', 'Motihar', 'Rajpara', 'Shah Makhdum', 'Godagari', 'Tanore', 'Mohanpur', 'Bagmara', 'Durgapur', 'Puthia', 'Charghat', 'Bagha']
  },
  {
    name: 'Bogura',
    division: 'Rajshahi',
    upazilas: ['Bogura Sadar', 'Sherpur', 'Shibganj', 'Sonatala', 'Gabtali', 'Kahaloo', 'Nandigram', 'Sariakandi', 'Adamdighi', 'Dhunat', 'Dupchanchia']
  },
  {
    name: 'Pabna',
    division: 'Rajshahi',
    upazilas: ['Pabna Sadar', 'Ishwardi', 'Santhia', 'Chatmohar', 'Bera', 'Bhangura', 'Faridpur', 'Atgharia', 'Sujanagar']
  },
  {
    name: 'Sirajganj',
    division: 'Rajshahi',
    upazilas: ['Sirajganj Sadar', 'Belkuchi', 'Chauhali', 'Kamarkhanda', 'Kazipur', 'Raiganj', 'Shahjadpur', 'Tarash', 'Ullahpara']
  },
  {
    name: 'Naogaon',
    division: 'Rajshahi',
    upazilas: ['Naogaon Sadar', 'Mohadevpur', 'Patnitala', 'Dhamoirhat', 'Manda', 'Niamatpur', 'Raninagar', 'Atrai', 'Badalgachhi', 'Sapahar', 'Porsha']
  },
  {
    name: 'Natore',
    division: 'Rajshahi',
    upazilas: ['Natore Sadar', 'Baraigram', 'Bagatipara', 'Gurudaspur', 'Lalpur', 'Singra', 'Naldanga']
  },
  {
    name: 'Chapai Nawabganj',
    division: 'Rajshahi',
    upazilas: ['Nawabganj Sadar', 'Shibganj', 'Gomastapur', 'Nachole', 'Bholahat']
  },
  {
    name: 'Joypurhat',
    division: 'Rajshahi',
    upazilas: ['Joypurhat Sadar', 'Akkelpur', 'Kalai', 'Khetlal', 'Panchbibi']
  },

  // Khulna Division
  {
    name: 'Khulna',
    division: 'Khulna',
    upazilas: ['Khulna Sadar', 'Sonadanga', 'Khalishpur', 'Daulatpur', 'Khan Jahan Ali', 'Dumuria', 'Batiaghata', 'Dacope', 'Phultala', 'Dighalia', 'Koyra', 'Paikgachha', 'Rupsha', 'Terokhada']
  },
  {
    name: 'Jashore',
    division: 'Khulna',
    upazilas: ['Jashore Sadar', 'Abhaynagar', 'Bagherpara', 'Chaugachha', 'Jhikargachha', 'Keshabpur', 'Manirampur', 'Sharsha']
  },
  {
    name: 'Kushtia',
    division: 'Khulna',
    upazilas: ['Kushtia Sadar', 'Kumarkhali', 'Khoksa', 'Mirpur', 'Bheramara', 'Daulatpur']
  },
  {
    name: 'Jhenaidah',
    division: 'Khulna',
    upazilas: ['Jhenaidah Sadar', 'Harinakunda', 'Kaliganj', 'Kotchandpur', 'Maheshpur', 'Shailkupa']
  },
  {
    name: 'Satkhira',
    division: 'Khulna',
    upazilas: ['Satkhira Sadar', 'Assasuni', 'Debhata', 'Kalaroa', 'Kaliganj', 'Shyamnagar', 'Tala']
  },
  {
    name: 'Bagerhat',
    division: 'Khulna',
    upazilas: ['Bagerhat Sadar', 'Chitalmari', 'Fakirhat', 'Kachua', 'Mollahat', 'Mongla', 'Morrelganj', 'Rampal', 'Sarankhola']
  },
  {
    name: 'Chuadanga',
    division: 'Khulna',
    upazilas: ['Chuadanga Sadar', 'Alamdanga', 'Damurhuda', 'Jibannagar']
  },
  {
    name: 'Meherpur',
    division: 'Khulna',
    upazilas: ['Meherpur Sadar', 'Gangni', 'Mujibnagar']
  },
  {
    name: 'Narail',
    division: 'Khulna',
    upazilas: ['Narail Sadar', 'Kalia', 'Lohagara']
  },
  {
    name: 'Magura',
    division: 'Khulna',
    upazilas: ['Magura Sadar', 'Mohammadpur', 'Shalikha', 'Sreepur']
  },

  // Barishal Division
  {
    name: 'Barishal',
    division: 'Barishal',
    upazilas: ['Barishal Sadar', 'Bakerganj', 'Babuganj', 'Banaripara', 'Gournadi', 'Hizla', 'Mehendiganj', 'Muladi', 'Wazirpur', 'Agailjhara']
  },
  {
    name: 'Patuakhali',
    division: 'Barishal',
    upazilas: ['Patuakhali Sadar', 'Bauphal', 'Dashmina', 'Galachipa', 'Kalapara', 'Mirzaganj', 'Dumki', 'Rangabali']
  },
  {
    name: 'Bhola',
    division: 'Barishal',
    upazilas: ['Bhola Sadar', 'Burhanuddin', 'Char Fasson', 'Daulatkhan', 'Lalmohan', 'Manpura', 'Tazumuddin']
  },
  {
    name: 'Pirojpur',
    division: 'Barishal',
    upazilas: ['Pirojpur Sadar', 'Bhandaria', 'Kawkhali', 'Mathbaria', 'Nazirpur', 'Nesarabad', 'Zianagar']
  },
  {
    name: 'Jhalokati',
    division: 'Barishal',
    upazilas: ['Jhalokati Sadar', 'Kathalia', 'Nalchity', 'Rajapur']
  },
  {
    name: 'Barguna',
    division: 'Barishal',
    upazilas: ['Barguna Sadar', 'Amtali', 'Bamna', 'Betagi', 'Patharghata', 'Taltali']
  },

  // Rangpur Division
  {
    name: 'Rangpur',
    division: 'Rangpur',
    upazilas: ['Rangpur Sadar', 'Badarganj', 'Gangachhara', 'Kaunia', 'Mithapukur', 'Pirgachha', 'Pirganj', 'Taraganj']
  },
  {
    name: 'Dinajpur',
    division: 'Rangpur',
    upazilas: ['Dinajpur Sadar', 'Birganj', 'Biral', 'Bochaganj', 'Chirirbandar', 'Phulbari', 'Ghoraghat', 'Hakimpur', 'Kaharole', 'Khansama', 'Nawabganj', 'Parbatipur']
  },
  {
    name: 'Kurigram',
    division: 'Rangpur',
    upazilas: ['Kurigram Sadar', 'Nageshwari', 'Bhurungamari', 'Phulbari', 'Rajarhat', 'Ulipur', 'Chilmari', 'Rowmari', 'Char Rajibpur']
  },
  {
    name: 'Gaibandha',
    division: 'Rangpur',
    upazilas: ['Gaibandha Sadar', 'Gobindaganj', 'Palashbari', 'Sadullapur', 'Saghata', 'Sundarganj', 'Phulchhari']
  },
  {
    name: 'Nilphamari',
    division: 'Rangpur',
    upazilas: ['Nilphamari Sadar', 'Saidpur', 'Domar', 'Dimla', 'Jaldhaka', 'Kishoreganj']
  },
  {
    name: 'Thakurgaon',
    division: 'Rangpur',
    upazilas: ['Thakurgaon Sadar', 'Pirganj', 'Ranisankail', 'Baliadangi', 'Haripur']
  },
  {
    name: 'Panchagarh',
    division: 'Rangpur',
    upazilas: ['Panchagarh Sadar', 'Boda', 'Debiganj', 'Atwari', 'Tetulia']
  },
  {
    name: 'Lalmonirhat',
    division: 'Rangpur',
    upazilas: ['Lalmonirhat Sadar', 'Aditmari', 'Kaliganj', 'Hatibandha', 'Patgram']
  },

  // Mymensingh Division
  {
    name: 'Mymensingh',
    division: 'Mymensingh',
    upazilas: ['Mymensingh Sadar', 'Muktagachha', 'Trishal', 'Bhaluka', 'Fulbaria', 'Gafargaon', 'Gauripur', 'Ishwarganj', 'Haluaghat', 'Dhobaura', 'Nandail', 'Phulpur', 'Tara Khanda']
  },
  {
    name: 'Jamalpur',
    division: 'Mymensingh',
    upazilas: ['Jamalpur Sadar', 'Bakshiganj', 'Dewanganj', 'Islampur', 'Madarganj', 'Melandaha', 'Sarishabari']
  },
  {
    name: 'Netrokona',
    division: 'Mymensingh',
    upazilas: ['Netrokona Sadar', 'Kendua', 'Atpara', 'Barhatta', 'Durgapur', 'Kalmakanda', 'Madan', 'Mohanganj', 'Purbadhala', 'Khaliajuri']
  },
  {
    name: 'Sherpur',
    division: 'Mymensingh',
    upazilas: ['Sherpur Sadar', 'Nakla', 'Nalitabari', 'Jhenaigati', 'Sreebardi']
  }
];

export const ALL_DISTRICT_NAMES = BANGLADESH_DISTRICTS.map(d => d.name).sort();

export function getUpazilasForDistrict(districtName: string): string[] {
  const found = BANGLADESH_DISTRICTS.find(
    d => d.name.toLowerCase() === districtName.toLowerCase()
  );
  return found ? found.upazilas : [];
}
