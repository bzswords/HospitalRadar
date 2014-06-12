var geocoder;          // object that will turn addresses into coordinates
var map;               // the actual google map 
var cityCircle;        // circle that is placed on map
var radius;            // range user is looking for hospital in
var markersArray = []; // will hold all markers currently on map
var infowindow = null; // initialize infowindow that will show hospital details
var hospitals_json_raw = {
  "Sheet1": [
    {
      "Provider Number": "'330100'",
      "Hospital Name": "NY EYE AND EAR INFIRMARY",
      "Address1": "310 EAST 14TH STREET",
      "City": "NEW YORK",
      "State": "NY",
      "ZIP Code": "10003",
      "County Name": "NEW YORK",
      "Phone Number": "2129794000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "No"
    },
    {
      "Provider Number": "'330169'",
      "Hospital Name": "BETH ISRAEL MEDICAL CENTER",
      "Address1": "FIRST AVENUE AT 16TH STREET",
      "City": "NEW YORK",
      "State": "NY",
      "ZIP Code": "10003",
      "County Name": "NEW YORK",
      "Phone Number": "2124202000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'33017F'",
      "Hospital Name": "VA NEW YORK HARBOR HEALTHCARE SYSTEM - NY DIV.",
      "Address1": "423 EAST 23RD STREET",
      "City": "NEW YORK",
      "State": "NY",
      "ZIP Code": "10010",
      "County Name": "NULL",
      "Phone Number": "2126867500",
      "Hospital Type": "ACUTE CARE - VETERANS ADMINISTRATION",
      "Hospital Ownership": "Government Federal",
      "Emergency Service": "NO"
    },
    {
      "Provider Number": "'330204'",
      "Hospital Name": "BELLEVUE HOSPITAL CENTER",
      "Address1": "462 FIRST AVENUE",
      "City": "NEW YORK",
      "State": "NY",
      "ZIP Code": "10016",
      "County Name": "NEW YORK",
      "Phone Number": "2125614132",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Government - Local",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330214'",
      "Hospital Name": "NYU HOSPITALS CENTER",
      "Address1": "550 FIRST AVENUE",
      "City": "NEW YORK",
      "State": "NY",
      "ZIP Code": "10016",
      "County Name": "NEW YORK",
      "Phone Number": "2122637300",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330270'",
      "Hospital Name": "HOSPITAL FOR SPECIAL SURGERY",
      "Address1": "535 EAST 70TH STREET",
      "City": "NEW YORK",
      "State": "NY",
      "ZIP Code": "10021",
      "County Name": "NEW YORK",
      "Phone Number": "2126061000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330101'",
      "Hospital Name": "NEW YORK-PRESBYTERIAN HOSPITAL",
      "Address1": "525 EAST 68TH STREET",
      "City": "NEW YORK",
      "State": "NY",
      "ZIP Code": "10021",
      "County Name": "NEW YORK",
      "Phone Number": "2127464189",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330119'",
      "Hospital Name": "LENOX HILL HOSPITAL",
      "Address1": "100 EAST 77TH STREET",
      "City": "NEW YORK",
      "State": "NY",
      "ZIP Code": "10021",
      "County Name": "NEW YORK",
      "Phone Number": "2124392345",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330154'",
      "Hospital Name": "MEMORIAL HOSPITAL FOR CANCER AND ALLIED DISEASES",
      "Address1": "1275 YORK AVENUE",
      "City": "NEW YORK",
      "State": "NY",
      "ZIP Code": "10021",
      "County Name": "NEW YORK",
      "Phone Number": "2126392000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "No"
    },
    {
      "Provider Number": "'330046'",
      "Hospital Name": "ST LUKE'S ROOSEVELT HOSPITAL",
      "Address1": "1111 AMSTERDAM AVENUE",
      "City": "NEW YORK",
      "State": "NY",
      "ZIP Code": "10025",
      "County Name": "NEW YORK",
      "Phone Number": "2125234000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330024'",
      "Hospital Name": "MOUNT SINAI HOSPITAL",
      "Address1": "ONE GUSTAVE L LEVY PLACE",
      "City": "NEW YORK",
      "State": "NY",
      "ZIP Code": "10029",
      "County Name": "NEW YORK",
      "Phone Number": "2122417981",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330199'",
      "Hospital Name": "METROPOLITAN HOSPITAL CENTER",
      "Address1": "1901 FIRST AVENUE",
      "City": "NEW YORK",
      "State": "NY",
      "ZIP Code": "10029",
      "County Name": "NEW YORK",
      "Phone Number": "2124237554",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Government - Local",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330240'",
      "Hospital Name": "HARLEM HOSPITAL CENTER",
      "Address1": "506 LENOX AVENUE",
      "City": "NEW YORK",
      "State": "NY",
      "ZIP Code": "10037",
      "County Name": "NEW YORK",
      "Phone Number": "2124918400",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Government - Local",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330064'",
      "Hospital Name": "NEW YORK DOWNTOWN HOSPITAL",
      "Address1": "170 WILLIAM STREET",
      "City": "NEW YORK",
      "State": "NY",
      "ZIP Code": "10038",
      "County Name": "NEW YORK",
      "Phone Number": "2123125000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330028'",
      "Hospital Name": "RICHMOND UNIVERSITY MEDICAL CENTER",
      "Address1": "355 BARD AVENUE",
      "City": "STATEN ISLAND",
      "State": "NY",
      "ZIP Code": "10304",
      "County Name": "RICHMOND",
      "Phone Number": "7188181234",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330160'",
      "Hospital Name": "STATEN ISLAND UNIVERSITY HOSPITAL",
      "Address1": "475 SEAVIEW AVENUE",
      "City": "STATEN ISLAND",
      "State": "NY",
      "ZIP Code": "10305",
      "County Name": "RICHMOND",
      "Phone Number": "7182269000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330080'",
      "Hospital Name": "LINCOLN MEDICAL & MENTAL HEALTH CENTER",
      "Address1": "234 EAST 149TH STREET",
      "City": "BRONX",
      "State": "NY",
      "ZIP Code": "10451",
      "County Name": "BRONX",
      "Phone Number": "7185795000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Government - Local",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330009'",
      "Hospital Name": "BRONX-LEBANON HOSPITAL CENTER",
      "Address1": "1276 FULTON AVENUE",
      "City": "BRONX",
      "State": "NY",
      "ZIP Code": "10456",
      "County Name": "BRONX",
      "Phone Number": "2125887000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Proprietary",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330399'",
      "Hospital Name": "ST BARNABAS HOSPITAL",
      "Address1": "4422 THIRD AVENUE",
      "City": "BRONX",
      "State": "NY",
      "ZIP Code": "10457",
      "County Name": "BRONX",
      "Phone Number": "2129609000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330127'",
      "Hospital Name": "JACOBI MEDICAL CENTER",
      "Address1": "1400 PELHAM PARKWAY SOUTH",
      "City": "BRONX",
      "State": "NY",
      "ZIP Code": "10461",
      "County Name": "BRONX",
      "Phone Number": "7189185000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Government - Local",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330059'",
      "Hospital Name": "MONTEFIORE MEDICAL CENTER",
      "Address1": "111 EAST 210TH STREET",
      "City": "BRONX",
      "State": "NY",
      "ZIP Code": "10467",
      "County Name": "BRONX",
      "Phone Number": "7189204321",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330385'",
      "Hospital Name": "NORTH CENTRAL BRONX HOSPITAL",
      "Address1": "3424 KOSSUTH AVENUE & 210TH STREET",
      "City": "BRONX",
      "State": "NY",
      "ZIP Code": "10467",
      "County Name": "BRONX",
      "Phone Number": "2125195000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Government - Local",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'33016F'",
      "Hospital Name": "BRONX VA MEDICAL CENTER",
      "Address1": "130 WEST KINGSBRIDGE ROAD",
      "City": "BRONX",
      "State": "NY",
      "ZIP Code": "10468",
      "County Name": "NULL",
      "Phone Number": "7185849000",
      "Hospital Type": "ACUTE CARE - VETERANS ADMINISTRATION",
      "Hospital Ownership": "Government Federal",
      "Emergency Service": "NO"
    },
    {
      "Provider Number": "'330273'",
      "Hospital Name": "PUTNAM HOSPITAL CENTER",
      "Address1": "670 STONELEIGH AVENUE",
      "City": "CARMEL",
      "State": "NY",
      "ZIP Code": "10512",
      "County Name": "PUTNAM",
      "Phone Number": "9142795711",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'33015F'",
      "Hospital Name": "VA HUDSON VALLEY HEALTHCARE SYSTEM",
      "Address1": "2094 ALBANY POST ROAD",
      "City": "MONTROSE",
      "State": "NY",
      "ZIP Code": "10548",
      "County Name": "NULL",
      "Phone Number": "9147374400",
      "Hospital Type": "ACUTE CARE - VETERANS ADMINISTRATION",
      "Hospital Ownership": "Government Federal",
      "Emergency Service": "NO"
    },
    {
      "Provider Number": "'330162'",
      "Hospital Name": "NORTHERN WESTCHESTER HOSPITAL",
      "Address1": "400 EAST MAIN STREET",
      "City": "MOUNT KISCO",
      "State": "NY",
      "ZIP Code": "10549",
      "County Name": "WESTCHESTER",
      "Phone Number": "9146661200",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330086'",
      "Hospital Name": "MOUNT VERNON HOSPITAL",
      "Address1": "12 NORTH 7TH AVENUE",
      "City": "MOUNT VERNON",
      "State": "NY",
      "ZIP Code": "10550",
      "County Name": "WESTCHESTER",
      "Phone Number": "9146648000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330267'",
      "Hospital Name": "HUDSON VALLEY HOSPITAL CENTER",
      "Address1": "1980 CROMPOND ROAD",
      "City": "CORTLANDT MANOR",
      "State": "NY",
      "ZIP Code": "10567",
      "County Name": "WESTCHESTER",
      "Phone Number": "9147343611",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330261'",
      "Hospital Name": "PHELPS MEMORIAL HOSPITAL ASSN",
      "Address1": "701 NORTH BROADWAY",
      "City": "SLEEPY HOLLOW",
      "State": "NY",
      "ZIP Code": "10591",
      "County Name": "WESTCHESTER",
      "Phone Number": "9143663000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Other",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330234'",
      "Hospital Name": "WESTCHESTER MEDICAL CENTER",
      "Address1": "100 WOODS RD",
      "City": "VALHALLA",
      "State": "NY",
      "ZIP Code": "10595",
      "County Name": "WESTCHESTER",
      "Phone Number": "9142857017",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Government - Hospital District or Authority",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330304'",
      "Hospital Name": "WHITE PLAINS HOSPITAL CENTER",
      "Address1": "41 EAST POST R0AD",
      "City": "WHITE PLAINS",
      "State": "NY",
      "ZIP Code": "10601",
      "County Name": "WESTCHESTER",
      "Phone Number": "9146810600",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330404'",
      "Hospital Name": "WINIFRED MASTERSON BURKE REHABILITATION HOSPITAL",
      "Address1": "785 MAMARONECK AVENUE",
      "City": "WHITE PLAINS",
      "State": "NY",
      "ZIP Code": "10605",
      "County Name": "WESTCHESTER",
      "Phone Number": "9145972232",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "No"
    },
    {
      "Provider Number": "'330208'",
      "Hospital Name": "ST JOHN'S RIVERSIDE HOSPITAL",
      "Address1": "976 NORTH BROADWAY",
      "City": "YONKERS",
      "State": "NY",
      "ZIP Code": "10701",
      "County Name": "WESTCHESTER",
      "Phone Number": "9149644444",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330006'",
      "Hospital Name": "ST JOSEPH'S MEDICAL CENTER",
      "Address1": "127 SOUTH BROADWAY",
      "City": "YONKERS",
      "State": "NY",
      "ZIP Code": "10701",
      "County Name": "WESTCHESTER",
      "Phone Number": "9143787000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330061'",
      "Hospital Name": "LAWRENCE HOSPITAL CENTER",
      "Address1": "55 PALMER AVENUE",
      "City": "BRONXVILLE",
      "State": "NY",
      "ZIP Code": "10708",
      "County Name": "WESTCHESTER",
      "Phone Number": "9147871000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Other",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330184'",
      "Hospital Name": "SOUND SHORE MEDICAL CENTER OF WESTSCHESTER",
      "Address1": "16 GUION PLACE",
      "City": "NEW ROCHELLE",
      "State": "NY",
      "ZIP Code": "10802",
      "County Name": "WESTCHESTER",
      "Phone Number": "9146325000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330158'",
      "Hospital Name": "GOOD SAMARITAN HOSPITAL OF SUFFERN",
      "Address1": "255 LAFAYETTE AVENUE",
      "City": "SUFFERN",
      "State": "NY",
      "ZIP Code": "10901",
      "County Name": "ROCKLAND",
      "Phone Number": "9143685000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Church",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330126'",
      "Hospital Name": "ORANGE REGIONAL MEDICAL CENTER",
      "Address1": "707 EAST MAIN STREET",
      "City": "MIDDLETOWN",
      "State": "NY",
      "ZIP Code": "10940",
      "County Name": "ORANGE",
      "Phone Number": "8453432424",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330104'",
      "Hospital Name": "NYACK HOSPITAL",
      "Address1": "160 NORTH MIDLAND AVENUE",
      "City": "NYACK",
      "State": "NY",
      "ZIP Code": "10960",
      "County Name": "ROCKLAND",
      "Phone Number": "8453482000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Other",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330205'",
      "Hospital Name": "ST ANTHONY COMMUNITY HOSPITAL",
      "Address1": "15 - 19  MAPLE AVENUE",
      "City": "WARWICK",
      "State": "NY",
      "ZIP Code": "10990",
      "County Name": "ORANGE",
      "Phone Number": "8459862276",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Church",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330405'",
      "Hospital Name": "HELEN HAYES HOSPITAL",
      "Address1": "51 NORTH ROUTE 9W",
      "City": "WEST HAVERSTRAW",
      "State": "NY",
      "ZIP Code": "10993",
      "County Name": "ROCKLAND",
      "Phone Number": "8457864000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Government - Local",
      "Emergency Service": "No"
    },
    {
      "Provider Number": "'330106'",
      "Hospital Name": "NORTH SHORE UNIVERSITY HOSPITAL",
      "Address1": "300 COMMUNITY DRIVE",
      "City": "MANHASSET",
      "State": "NY",
      "ZIP Code": "11030",
      "County Name": "NASSAU",
      "Phone Number": "5165620100",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330195'",
      "Hospital Name": "LONG ISLAND JEWISH MEDICAL CENTER",
      "Address1": "270 - 05 76TH AVENUE",
      "City": "NEW HYDE PARK",
      "State": "NY",
      "ZIP Code": "11040",
      "County Name": "NASSAU",
      "Phone Number": "7184707000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330056'",
      "Hospital Name": "BROOKLYN HOSPITAL CENTER AT DOWNTOWN CAMPUS",
      "Address1": "121 DEKALB AVENUE",
      "City": "BROOKLYN",
      "State": "NY",
      "ZIP Code": "11201",
      "County Name": "KINGS",
      "Phone Number": "7182508000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330201'",
      "Hospital Name": "KINGSBROOK JEWISH MEDICAL CENTER",
      "Address1": "585 SCHENECTADY AVENUE",
      "City": "BROOKLYN",
      "State": "NY",
      "ZIP Code": "11203",
      "County Name": "KINGS",
      "Phone Number": "7186045789",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330202'",
      "Hospital Name": "KINGS COUNTY HOSPITAL CENTER",
      "Address1": "451 CLARKSON AVENUE",
      "City": "BROOKLYN",
      "State": "NY",
      "ZIP Code": "11203",
      "County Name": "KINGS",
      "Phone Number": "7182453901",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Government - Local",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330350'",
      "Hospital Name": "UNIVERSITY HOSPITAL OF BROOKLYN ( DOWNSTATE )",
      "Address1": "445 LENOX ROAD",
      "City": "BROOKLYN",
      "State": "NY",
      "ZIP Code": "11203",
      "County Name": "KINGS",
      "Phone Number": "7182701000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Government - State",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330396'",
      "Hospital Name": "WOODHULL MEDICAL AND MENTAL HEALTH CENTER",
      "Address1": "760 BROADWAY",
      "City": "BROOKLYN",
      "State": "NY",
      "ZIP Code": "11206",
      "County Name": "KINGS",
      "Phone Number": "7189638100",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Government - Local",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330233'",
      "Hospital Name": "BROOKDALE HOSPITAL MEDICAL CENTER",
      "Address1": "LINDEN BOULEVARD AT BROOKDALE PLAZA",
      "City": "BROOKLYN",
      "State": "NY",
      "ZIP Code": "11212",
      "County Name": "KINGS",
      "Phone Number": "7182405966",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330397'",
      "Hospital Name": "INTERFAITH MEDICAL CENTER",
      "Address1": "1545 ATLANTIC AVENUE",
      "City": "BROOKLYN",
      "State": "NY",
      "ZIP Code": "11213",
      "County Name": "KINGS",
      "Phone Number": "7186134000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330236'",
      "Hospital Name": "NEW YORK METHODIST HOSPITAL",
      "Address1": "506 SIXTH STREET",
      "City": "BROOKLYN",
      "State": "NY",
      "ZIP Code": "11215",
      "County Name": "KINGS",
      "Phone Number": "7187803000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330194'",
      "Hospital Name": "MAIMONIDES MEDICAL CENTER",
      "Address1": "4802 TENTH AVENUE",
      "City": "BROOKLYN",
      "State": "NY",
      "ZIP Code": "11219",
      "County Name": "KINGS",
      "Phone Number": "7182836000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330306'",
      "Hospital Name": "LUTHERAN MEDICAL CENTER",
      "Address1": "150 55TH STREET",
      "City": "BROOKLYN",
      "State": "NY",
      "ZIP Code": "11220",
      "County Name": "KINGS",
      "Phone Number": "7186308000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330019'",
      "Hospital Name": "NEW YORK COMMUNITY HOSPITAL OF BROOKLYN INC.",
      "Address1": "2525 KINGS HIGHWAY",
      "City": "BROOKLYN",
      "State": "NY",
      "ZIP Code": "11229",
      "County Name": "KINGS",
      "Phone Number": "7186925302",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330196'",
      "Hospital Name": "CONEY ISLAND HOSPITAL",
      "Address1": "2601 OCEAN PARKWAY",
      "City": "BROOKLYN",
      "State": "NY",
      "ZIP Code": "11235",
      "County Name": "KINGS",
      "Phone Number": "7186163000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Government - Local",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330221'",
      "Hospital Name": "WYCKOFF HEIGHTS MEDICAL CENTER",
      "Address1": "374 STOCKHOLM STREET",
      "City": "BROOKLYN",
      "State": "NY",
      "ZIP Code": "11237",
      "County Name": "KINGS",
      "Phone Number": "7189637272",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Other",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330193'",
      "Hospital Name": "FLUSHING HOSPITAL MEDICAL CENTER",
      "Address1": "45TH AVENUE AND PARSONS BOULEVARD",
      "City": "FLUSHING",
      "State": "NY",
      "ZIP Code": "11355",
      "County Name": "QUEENS",
      "Phone Number": "7186705000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330055'",
      "Hospital Name": "NEW YORK HOSPITAL MEDICAL CENTER OF QUEENS",
      "Address1": "56-45 MAIN STREET",
      "City": "FLUSHING",
      "State": "NY",
      "ZIP Code": "11355",
      "County Name": "QUEENS",
      "Phone Number": "7186701231",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Other",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330128'",
      "Hospital Name": "ELMHURST HOSPITAL CENTER",
      "Address1": "79-01 BROADWAY",
      "City": "ELMHURST",
      "State": "NY",
      "ZIP Code": "11373",
      "County Name": "QUEENS",
      "Phone Number": "7183341141",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Government - Local",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330353'",
      "Hospital Name": "FOREST HILLS HOSPITAL",
      "Address1": "102 - 01 66TH ROAD",
      "City": "FOREST HILLS",
      "State": "NY",
      "ZIP Code": "11375",
      "County Name": "QUEENS",
      "Phone Number": "7188304000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Other",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330014'",
      "Hospital Name": "JAMAICA HOSPITAL MEDICAL CENTER",
      "Address1": "89TH AVENUE AND VAN WYCK EXPRESSWAY",
      "City": "JAMAICA",
      "State": "NY",
      "ZIP Code": "11418",
      "County Name": "QUEENS",
      "Phone Number": "7182626000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330231'",
      "Hospital Name": "QUEENS HOSPITAL CENTER",
      "Address1": "82-68 164TH STREET",
      "City": "JAMAICA",
      "State": "NY",
      "ZIP Code": "11432",
      "County Name": "QUEENS",
      "Phone Number": "7188833000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Government - Local",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330167'",
      "Hospital Name": "WINTHROP-UNIVERSITY HOSPITAL",
      "Address1": "259 FIRST STREET",
      "City": "MINEOLA",
      "State": "NY",
      "ZIP Code": "11501",
      "County Name": "NASSAU",
      "Phone Number": "5166630333",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330181'",
      "Hospital Name": "GLEN COVE HOSPITAL",
      "Address1": "101 ST ANDREWS LANE",
      "City": "GLEN COVE",
      "State": "NY",
      "ZIP Code": "11542",
      "County Name": "NASSAU",
      "Phone Number": "5166747300",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330027'",
      "Hospital Name": "NASSAU UNIVERSITY MEDICAL CENTER",
      "Address1": "2201 HEMPSTEAD TURNPIKE",
      "City": "EAST MEADOW",
      "State": "NY",
      "ZIP Code": "11554",
      "County Name": "NASSAU",
      "Phone Number": "5165720123",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Government - State",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330225'",
      "Hospital Name": "LONG BEACH MEDICAL CENTER",
      "Address1": "455 EAST BAY DRIVE",
      "City": "LONG BEACH",
      "State": "NY",
      "ZIP Code": "11561",
      "County Name": "NASSAU",
      "Phone Number": "5168971000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330259'",
      "Hospital Name": "MERCY MEDICAL CENTER",
      "Address1": "1000 NORTH VILLAGE AVENUE",
      "City": "ROCKVILLE CENTRE",
      "State": "NY",
      "ZIP Code": "11570",
      "County Name": "NASSAU",
      "Phone Number": "5167052525",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Church",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330198'",
      "Hospital Name": "SOUTH NASSAU COMMUNITIES HOSPITAL",
      "Address1": "ONE HEALTHY WAY",
      "City": "OCEANSIDE",
      "State": "NY",
      "ZIP Code": "11572",
      "County Name": "NASSAU",
      "Phone Number": "5166323000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330182'",
      "Hospital Name": "ST FRANCIS HOSPITAL ROSLYN",
      "Address1": "100 PORT WASHINGTON BOULEVARD",
      "City": "ROSLYN",
      "State": "NY",
      "ZIP Code": "11576",
      "County Name": "NASSAU",
      "Phone Number": "5165626000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Church",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330372'",
      "Hospital Name": "FRANKLIN HOSPITAL",
      "Address1": "900 FRANKLIN AVENUE",
      "City": "VALLEY STREAM",
      "State": "NY",
      "ZIP Code": "11580",
      "County Name": "NASSAU",
      "Phone Number": "5162566000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330395'",
      "Hospital Name": "ST JOHN'S EPISCOPAL HOSPITAL AT SOUTH SHORE",
      "Address1": "327 BEACH 19TH STREET",
      "City": "FAR ROCKAWAY",
      "State": "NY",
      "ZIP Code": "11691",
      "County Name": "QUEENS",
      "Phone Number": "7188697000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330043'",
      "Hospital Name": "SOUTHSIDE HOSPITAL",
      "Address1": "301 EAST MAIN STREET",
      "City": "BAY SHORE",
      "State": "NY",
      "ZIP Code": "11706",
      "County Name": "SUFFOLK",
      "Phone Number": "6319683000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330332'",
      "Hospital Name": "ST JOSEPH HOSPITAL",
      "Address1": "4295 HEMPSTEAD TURNPIKE",
      "City": "BETHPAGE",
      "State": "NY",
      "ZIP Code": "11714",
      "County Name": "NASSAU",
      "Phone Number": "5165796000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330045'",
      "Hospital Name": "HUNTINGTON HOSPITAL",
      "Address1": "270 PARK AVENUE",
      "City": "HUNTINGTON",
      "State": "NY",
      "ZIP Code": "11743",
      "County Name": "SUFFOLK",
      "Phone Number": "6313512000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'33019F'",
      "Hospital Name": "NORTHPORT VA MEDICAL CENTER",
      "Address1": "79 MIDDLEVILLE ROAD",
      "City": "NORTHPORT",
      "State": "NY",
      "ZIP Code": "11768",
      "County Name": "NULL",
      "Phone Number": "5162614400",
      "Hospital Type": "ACUTE CARE - VETERANS ADMINISTRATION",
      "Hospital Ownership": "Government Federal",
      "Emergency Service": "NO"
    },
    {
      "Provider Number": "'330141'",
      "Hospital Name": "BROOKHAVEN MEMORIAL HOSPITAL MEDICAL CENTER",
      "Address1": "101 HOSPITAL ROAD",
      "City": "PATCHOGUE",
      "State": "NY",
      "ZIP Code": "11772",
      "County Name": "SUFFOLK",
      "Phone Number": "6316547100",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330185'",
      "Hospital Name": "JOHN T MATHER MEMORIAL HOSPITAL  OF PORT JEFFERSON",
      "Address1": "75 NORTH COUNTRY ROAD",
      "City": "PORT JEFFERSON",
      "State": "NY",
      "ZIP Code": "11777",
      "County Name": "SUFFOLK",
      "Phone Number": "6314731320",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330246'",
      "Hospital Name": "ST CHARLES HOSPITAL",
      "Address1": "200 BELLE TERRE ROAD",
      "City": "PORT JEFFERSON",
      "State": "NY",
      "ZIP Code": "11777",
      "County Name": "SUFFOLK",
      "Phone Number": "6314746000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Church",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330401'",
      "Hospital Name": "ST CATHERINE OF SIENA HOSPITAL",
      "Address1": "50 ROUTE 25A",
      "City": "SMITHTOWN",
      "State": "NY",
      "ZIP Code": "11787",
      "County Name": "SUFFOLK",
      "Phone Number": "6318623000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Church",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330393'",
      "Hospital Name": "UNIVERSITY HOSPITAL ( STONY BROOK )",
      "Address1": "HEALTH SCIENCES CENTER SUNY",
      "City": "STONY BROOK",
      "State": "NY",
      "ZIP Code": "11794",
      "County Name": "SUFFOLK",
      "Phone Number": "6314444000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Government - State",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330286'",
      "Hospital Name": "GOOD SAMARITAN HOSPITAL MEDICAL CENTER",
      "Address1": "1000 MONTAUK HIGHWAY",
      "City": "WEST ISLIP",
      "State": "NY",
      "ZIP Code": "11795",
      "County Name": "SUFFOLK",
      "Phone Number": "6313763000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Church",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330331'",
      "Hospital Name": "PLAINVIEW HOSPITAL",
      "Address1": "888 OLD COUNTRY ROAD",
      "City": "PLAINVIEW",
      "State": "NY",
      "ZIP Code": "11803",
      "County Name": "NASSAU",
      "Phone Number": "5167193000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330107'",
      "Hospital Name": "PECONIC BAY MEDICAL CENTER",
      "Address1": "1300 ROANOKE AVENUE",
      "City": "RIVERHEAD",
      "State": "NY",
      "ZIP Code": "11901",
      "County Name": "SUFFOLK",
      "Phone Number": "6315486000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330088'",
      "Hospital Name": "EASTERN LONG ISLAND HOSPITAL",
      "Address1": "201 MANOR PLACE",
      "City": "GREENPORT",
      "State": "NY",
      "ZIP Code": "11944",
      "County Name": "SUFFOLK",
      "Phone Number": "6314771000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330340'",
      "Hospital Name": "SOUTHAMPTON HOSPITAL",
      "Address1": "240 MEETING HOUSE LANE",
      "City": "SOUTHAMPTON",
      "State": "NY",
      "ZIP Code": "11968",
      "County Name": "SUFFOLK",
      "Phone Number": "5167268200",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330047'",
      "Hospital Name": "ST MARY'S HOSPITAL AT AMSTERDAM",
      "Address1": "427 GUY PARK AVENUE",
      "City": "AMSTERDAM",
      "State": "NY",
      "ZIP Code": "12010",
      "County Name": "MONTGOMERY",
      "Phone Number": "5188421900",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330268'",
      "Hospital Name": "COBLESKILL REGIONAL HOSPITAL",
      "Address1": "178 GRANDVIEW DRIVE",
      "City": "COBLESKILL",
      "State": "NY",
      "ZIP Code": "12043",
      "County Name": "SCHOHARIE",
      "Phone Number": "5182543270",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330276'",
      "Hospital Name": "NATHAN LITTAUER HOSPITAL",
      "Address1": "99 EAST STATE STREET",
      "City": "GLOVERSVILLE",
      "State": "NY",
      "ZIP Code": "12078",
      "County Name": "FULTON",
      "Phone Number": "5187258621",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330232'",
      "Hospital Name": "ST MARY'S HOSPITAL ( TROY )",
      "Address1": "1300 MASSACHUSETTS AVENUE",
      "City": "TROY",
      "State": "NY",
      "ZIP Code": "12180",
      "County Name": "RENSSELAER",
      "Phone Number": "5182725000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Church",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330180'",
      "Hospital Name": "SAMARITAN HOSPITAL",
      "Address1": "2215 BURDETT AVENUE",
      "City": "TROY",
      "State": "NY",
      "ZIP Code": "12180",
      "County Name": "RENSSELAER",
      "Phone Number": "5182713225",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330409'",
      "Hospital Name": "BURDETT CARE CENTER",
      "Address1": "2215 BURDETT AVE",
      "City": "TROY",
      "State": "NY",
      "ZIP Code": "12180",
      "County Name": "RENSSELAER",
      "Phone Number": "5182713655",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "No"
    },
    {
      "Provider Number": "'330003'",
      "Hospital Name": "ALBANY MEMORIAL HOSPITAL",
      "Address1": "600 NORTHERN BOULEVARD",
      "City": "ALBANY",
      "State": "NY",
      "ZIP Code": "12204",
      "County Name": "ALBANY",
      "Phone Number": "5184713221",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330013'",
      "Hospital Name": "ALBANY MEDICAL CENTER HOSPITAL",
      "Address1": "43 NEW SCOTLAND AVENUE",
      "City": "ALBANY",
      "State": "NY",
      "ZIP Code": "12208",
      "County Name": "ALBANY",
      "Phone Number": "5182623125",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330057'",
      "Hospital Name": "ST PETER'S HOSPITAL",
      "Address1": "315 SOUTH MANNING BOULEVARD",
      "City": "ALBANY",
      "State": "NY",
      "ZIP Code": "12208",
      "County Name": "ALBANY",
      "Phone Number": "5185251550",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Church",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'33009F'",
      "Hospital Name": "ALBANY VA MEDICAL CENTER",
      "Address1": "113 HOLLAND AVENUE",
      "City": "ALBANY",
      "State": "NY",
      "ZIP Code": "12208",
      "County Name": "NULL",
      "Phone Number": "5186265000",
      "Hospital Type": "ACUTE CARE - VETERANS ADMINISTRATION",
      "Hospital Ownership": "Government Federal",
      "Emergency Service": "NO"
    },
    {
      "Provider Number": "'330153'",
      "Hospital Name": "ELLIS HOSPITAL",
      "Address1": "1101 NOTT STREET",
      "City": "SCHENECTADY",
      "State": "NY",
      "ZIP Code": "12308",
      "County Name": "SCHENECTADY",
      "Phone Number": "5182434196",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Proprietary",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330406'",
      "Hospital Name": "SUNNYVIEW HOSPITAL AND REHABILITATION CENTER",
      "Address1": "1270 BELMONT AVENUE",
      "City": "SCHENECTADY",
      "State": "NY",
      "ZIP Code": "12308",
      "County Name": "SCHENECTADY",
      "Phone Number": "5183863580",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "No"
    },
    {
      "Provider Number": "'330224'",
      "Hospital Name": "HEALTH ALLIANCE HOSPITAL MARY'S AVENUE CAMPUS",
      "Address1": "105 MARY'S AVENUE",
      "City": "KINGSTON",
      "State": "NY",
      "ZIP Code": "12401",
      "County Name": "ULSTER",
      "Phone Number": "8453382500",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Church",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330004'",
      "Hospital Name": "HEALTH ALLIANCE HOSPITAL BROADWAY CAMPUS",
      "Address1": "396 BROADWAY",
      "City": "KINGSTON",
      "State": "NY",
      "ZIP Code": "12401",
      "County Name": "ULSTER",
      "Phone Number": "9143313131",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "No"
    },
    {
      "Provider Number": "'331310'",
      "Hospital Name": "ELLENVILLE REGIONAL HOSPITAL",
      "Address1": "10 HEALTHY WAY",
      "City": "ELLENVILLE",
      "State": "NY",
      "ZIP Code": "12428",
      "County Name": "ULSTER",
      "Phone Number": "8456476400",
      "Hospital Type": "Critical Access Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'331304'",
      "Hospital Name": "MARGARETVILLE MEMORIAL HOSPITAL",
      "Address1": "42084 STATE HIGHWAY 28",
      "City": "MARGARETVILLE",
      "State": "NY",
      "ZIP Code": "12455",
      "County Name": "DELAWARE",
      "Phone Number": "8455865631",
      "Hospital Type": "Critical Access Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330094'",
      "Hospital Name": "COLUMBIA MEMORIAL HOSPITAL",
      "Address1": "71 PROSPECT AVENUE",
      "City": "HUDSON",
      "State": "NY",
      "ZIP Code": "12534",
      "County Name": "COLUMBIA",
      "Phone Number": "5188287601",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330264'",
      "Hospital Name": "ST LUKE'S CORNWALL HOSPITAL",
      "Address1": "70 DUBOIS STREET",
      "City": "NEWBURGH",
      "State": "NY",
      "ZIP Code": "12550",
      "County Name": "ORANGE",
      "Phone Number": "8455614400",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Other",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330049'",
      "Hospital Name": "NORTHERN DUTCHESS HOSPITAL",
      "Address1": "6511 SPRINGBROOK AVENUE",
      "City": "RHINEBECK",
      "State": "NY",
      "ZIP Code": "12572",
      "County Name": "DUTCHESS",
      "Phone Number": "8458713391",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Other",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330067'",
      "Hospital Name": "ST FRANCIS HOSPITAL",
      "Address1": "241 NORTH ROAD",
      "City": "POUGHKEEPSIE",
      "State": "NY",
      "ZIP Code": "12601",
      "County Name": "DUTCHESS",
      "Phone Number": "8454835000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330023'",
      "Hospital Name": "VASSAR BROTHERS MEDICAL CENTER",
      "Address1": "45 READE PLACE",
      "City": "POUGHKEEPSIE",
      "State": "NY",
      "ZIP Code": "12601",
      "County Name": "DUTCHESS",
      "Phone Number": "8454548500",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Other",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'331303'",
      "Hospital Name": "CATSKILL REGIONAL MEDICAL CENTER - G HERMANN SITE",
      "Address1": "8081 ROUTE 97",
      "City": "CALLICOON",
      "State": "NY",
      "ZIP Code": "12723",
      "County Name": "SULLIVAN",
      "Phone Number": "8458875530",
      "Hospital Type": "Critical Access Hospitals",
      "Hospital Ownership": "Government - Federal",
      "Emergency Service": "No"
    },
    {
      "Provider Number": "'330386'",
      "Hospital Name": "CATSKILL REGIONAL MEDICAL CENTER",
      "Address1": "68 HARRIS BUSHVILLE ROAD",
      "City": "HARRIS",
      "State": "NY",
      "ZIP Code": "12742",
      "County Name": "SULLIVAN",
      "Phone Number": "8457943300",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330135'",
      "Hospital Name": "BON SECOURS COMMUNITY HOSPITAL",
      "Address1": "160 EAST MAIN STREET",
      "City": "PORT JERVIS",
      "State": "NY",
      "ZIP Code": "12771",
      "County Name": "ORANGE",
      "Phone Number": "8458565351",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Church",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330191'",
      "Hospital Name": "GLENS FALLS HOSPITAL",
      "Address1": "100 PARK STREET",
      "City": "GLENS FALLS",
      "State": "NY",
      "ZIP Code": "12801",
      "County Name": "WARREN",
      "Phone Number": "5189261000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330222'",
      "Hospital Name": "SARATOGA HOSPITAL",
      "Address1": "211 CHURCH STREET",
      "City": "SARATOGA SPRINGS",
      "State": "NY",
      "ZIP Code": "12866",
      "County Name": "SARATOGA",
      "Phone Number": "5185873222",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'331306'",
      "Hospital Name": "MOSES-LUDINGTON HOSPITAL",
      "Address1": "1019 WICKER STREET",
      "City": "TICONDEROGA",
      "State": "NY",
      "ZIP Code": "12883",
      "County Name": "ESSEX",
      "Phone Number": "5185852831",
      "Hospital Type": "Critical Access Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330250'",
      "Hospital Name": "CHAMPLAIN VALLEY PHYSICIANS HOSPITAL MEDICAL CTR",
      "Address1": "75 BEEKMAN STREET",
      "City": "PLATTSBURGH",
      "State": "NY",
      "ZIP Code": "12901",
      "County Name": "CLINTON",
      "Phone Number": "5185612000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'331302'",
      "Hospital Name": "ELIZABETHTOWN COMMUNITY HOSPITAL",
      "Address1": "75 PARK STREET",
      "City": "ELIZABETHTOWN",
      "State": "NY",
      "ZIP Code": "12932",
      "County Name": "ESSEX",
      "Phone Number": "5188736377",
      "Hospital Type": "Critical Access Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330084'",
      "Hospital Name": "ALICE HYDE MEDICAL CENTER",
      "Address1": "133 PARK STREET",
      "City": "MALONE",
      "State": "NY",
      "ZIP Code": "12953",
      "County Name": "FRANKLIN",
      "Phone Number": "5184833000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Other",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330079'",
      "Hospital Name": "ADIRONDACK MEDICAL CENTER",
      "Address1": "2233 STATE ROUTE 86",
      "City": "SARANAC LAKE",
      "State": "NY",
      "ZIP Code": "12983",
      "County Name": "FRANKLIN",
      "Phone Number": "5188914141",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Other",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330235'",
      "Hospital Name": "AUBURN COMMUNITY HOSPITAL",
      "Address1": "17 LANSING STREET",
      "City": "AUBURN",
      "State": "NY",
      "ZIP Code": "13021",
      "County Name": "CAYUGA",
      "Phone Number": "3152557011",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330175'",
      "Hospital Name": "CORTLAND REGIONAL MEDICAL CENTER INC",
      "Address1": "134 HOMER AVENUE",
      "City": "CORTLAND",
      "State": "NY",
      "ZIP Code": "13045",
      "County Name": "CORTLAND",
      "Phone Number": "6077563500",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330218'",
      "Hospital Name": "OSWEGO HOSPITAL",
      "Address1": "110 WEST SIXTH STREET",
      "City": "OSWEGO",
      "State": "NY",
      "ZIP Code": "13126",
      "County Name": "OSWEGO",
      "Phone Number": "3153495511",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330140'",
      "Hospital Name": "ST JOSEPH'S HOSPITAL HEALTH CENTER",
      "Address1": "301 PROSPECT AVENUE",
      "City": "SYRACUSE",
      "State": "NY",
      "ZIP Code": "13203",
      "County Name": "ONONDAGA",
      "Phone Number": "3154485111",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Church",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'33024F'",
      "Hospital Name": "SYRACUSE VA MEDICAL CENTER",
      "Address1": "800 IRVING AVE.",
      "City": "SYRACUSE",
      "State": "NY",
      "ZIP Code": "13210",
      "County Name": "NULL",
      "Phone Number": "3154254400",
      "Hospital Type": "ACUTE CARE - VETERANS ADMINISTRATION",
      "Hospital Ownership": "Government Federal",
      "Emergency Service": "NO"
    },
    {
      "Provider Number": "'330241'",
      "Hospital Name": "UNIVERSITY HOSPITAL S U N Y HEALTH SCIENCE CENTER",
      "Address1": "750 EAST ADAMS STREET",
      "City": "SYRACUSE",
      "State": "NY",
      "ZIP Code": "13210",
      "County Name": "ONONDAGA",
      "Phone Number": "3154734240",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Government - State",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330203'",
      "Hospital Name": "CROUSE HOSPITAL",
      "Address1": "736 IRVING AVENUE",
      "City": "SYRACUSE",
      "State": "NY",
      "ZIP Code": "13210",
      "County Name": "ONONDAGA",
      "Phone Number": "3154707449",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330136'",
      "Hospital Name": "MARY IMOGENE BASSETT HOSPITAL",
      "Address1": "ONE ATWELL ROAD",
      "City": "COOPERSTOWN",
      "State": "NY",
      "ZIP Code": "13326",
      "County Name": "OTSEGO",
      "Phone Number": "6075473456",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330249'",
      "Hospital Name": "COMMUNITY MEMORIAL HOSPITAL INC",
      "Address1": "150 BROAD STREET",
      "City": "HAMILTON",
      "State": "NY",
      "ZIP Code": "13346",
      "County Name": "MADISON",
      "Phone Number": "3158241100",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'331311'",
      "Hospital Name": "LITTLE FALLS HOSPITAL",
      "Address1": "140 BURWELL STREET",
      "City": "LITTLE FALLS",
      "State": "NY",
      "ZIP Code": "13365",
      "County Name": "HERKIMER",
      "Phone Number": "3158235261",
      "Hospital Type": "Critical Access Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330213'",
      "Hospital Name": "LEWIS COUNTY GENERAL HOSPITAL",
      "Address1": "7785 NORTH STATE STREET",
      "City": "LOWVILLE",
      "State": "NY",
      "ZIP Code": "13367",
      "County Name": "LEWIS",
      "Phone Number": "3153765200",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Government - Local",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330115'",
      "Hospital Name": "ONEIDA HEALTHCARE CENTER",
      "Address1": "321 GENESEE STREET",
      "City": "ONEIDA",
      "State": "NY",
      "ZIP Code": "13421",
      "County Name": "MADISON",
      "Phone Number": "3153636000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Other",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330215'",
      "Hospital Name": "ROME MEMORIAL HOSPITAL INC",
      "Address1": "1500 NORTH JAMES STREET",
      "City": "ROME",
      "State": "NY",
      "ZIP Code": "13440",
      "County Name": "ONEIDA",
      "Phone Number": "3153387000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330245'",
      "Hospital Name": "ST ELIZABETH MEDICAL CENTER",
      "Address1": "2209 GENESEE STREET",
      "City": "UTICA",
      "State": "NY",
      "ZIP Code": "13501",
      "County Name": "ONEIDA",
      "Phone Number": "3157988100",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330044'",
      "Hospital Name": "FAXTON-ST LUKE'S HEALTHCARE",
      "Address1": "1656 CHAMPLIN AVENUE",
      "City": "UTICA",
      "State": "NY",
      "ZIP Code": "13503",
      "County Name": "ONEIDA",
      "Phone Number": "3157986000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330157'",
      "Hospital Name": "SAMARITAN MEDICAL CENTER",
      "Address1": "830 WASHINGTON STREET",
      "City": "WATERTOWN",
      "State": "NY",
      "ZIP Code": "13601",
      "County Name": "JEFFERSON",
      "Phone Number": "3157854121",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Other",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'331309'",
      "Hospital Name": "RIVER HOSPITAL INC",
      "Address1": "4 FULLER STREET",
      "City": "ALEXANDRIA BAY",
      "State": "NY",
      "ZIP Code": "13607",
      "County Name": "JEFFERSON",
      "Phone Number": "3154822511",
      "Hospital Type": "Critical Access Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330263'",
      "Hospital Name": "CARTHAGE AREA HOSPITAL INC",
      "Address1": "1001 WEST STREET",
      "City": "CARTHAGE",
      "State": "NY",
      "ZIP Code": "13619",
      "County Name": "JEFFERSON",
      "Phone Number": "3154931000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330177'",
      "Hospital Name": "EDWARD JOHN  NOBLE HOSPITAL OF GOUVERNEUR",
      "Address1": "77 WEST BARNEY STREET",
      "City": "GOUVERNEUR",
      "State": "NY",
      "ZIP Code": "13642",
      "County Name": "SAINT LAWRENCE",
      "Phone Number": "3152871000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330223'",
      "Hospital Name": "MASSENA MEMORIAL HOSPITAL",
      "Address1": "1 HOSPITAL DRIVE",
      "City": "MASSENA",
      "State": "NY",
      "ZIP Code": "13662",
      "County Name": "SAINT LAWRENCE",
      "Phone Number": "3157641711",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Government - Local",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330211'",
      "Hospital Name": "CLAXTON-HEPBURN MEDICAL CENTER",
      "Address1": "214 KING STREET",
      "City": "OGDENSBURG",
      "State": "NY",
      "ZIP Code": "13669",
      "County Name": "SAINT LAWRENCE",
      "Phone Number": "3153933600",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330197'",
      "Hospital Name": "CANTON-POTSDAM HOSPITAL",
      "Address1": "50 LEROY STREET",
      "City": "POTSDAM",
      "State": "NY",
      "ZIP Code": "13676",
      "County Name": "SAINT LAWRENCE",
      "Phone Number": "3152653300",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'331307'",
      "Hospital Name": "CLIFTON FINE HOSPITAL",
      "Address1": "1014 OSWEGATCHIE TRAIL",
      "City": "STAR LAKE",
      "State": "NY",
      "ZIP Code": "13690",
      "County Name": "SAINT LAWRENCE",
      "Phone Number": "3158483351",
      "Hospital Type": "Critical Access Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'331305'",
      "Hospital Name": "O'CONNOR HOSPITAL",
      "Address1": "460 ANDES ROAD",
      "City": "DELHI",
      "State": "NY",
      "ZIP Code": "13753",
      "County Name": "DELAWARE",
      "Phone Number": "6077460300",
      "Hospital Type": "Critical Access Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330394'",
      "Hospital Name": "UNITED HEALTH SERVICES HOSPITALS INC",
      "Address1": "33-57 HARRISON STREET",
      "City": "JOHNSON CITY",
      "State": "NY",
      "ZIP Code": "13790",
      "County Name": "BROOME",
      "Phone Number": "6077636000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330033'",
      "Hospital Name": "CHENANGO MEMORIAL HOSPITAL INC",
      "Address1": "179 NORTH BROAD STREET",
      "City": "NORWICH",
      "State": "NY",
      "ZIP Code": "13815",
      "County Name": "CHENANGO",
      "Phone Number": "6073354111",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330085'",
      "Hospital Name": "AURELIA OSBORN FOX MEMORIAL HOSPITAL",
      "Address1": "ONE NORTON AVENUE",
      "City": "ONEONTA",
      "State": "NY",
      "ZIP Code": "13820",
      "County Name": "OTSEGO",
      "Phone Number": "6074232000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Other",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'331312'",
      "Hospital Name": "DELAWARE VALLEY HOSPITAL INC",
      "Address1": "1 TITUS PLACE",
      "City": "WALTON",
      "State": "NY",
      "ZIP Code": "13856",
      "County Name": "DELAWARE",
      "Phone Number": "6078652100",
      "Hospital Type": "Critical Access Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330011'",
      "Hospital Name": "OUR LADY OF LOURDES MEMORIAL HOSPITAL INC",
      "Address1": "169 RIVERSIDE DRIVE",
      "City": "BINGHAMTON",
      "State": "NY",
      "ZIP Code": "13905",
      "County Name": "BROOME",
      "Phone Number": "6077985111",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330073'",
      "Hospital Name": "UNITED MEMORIAL MEDICAL CENTER",
      "Address1": "127 NORTH STREET",
      "City": "BATAVIA",
      "State": "NY",
      "ZIP Code": "14020",
      "County Name": "GENESEE",
      "Phone Number": "5853436030",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330229'",
      "Hospital Name": "BROOKS MEMORIAL HOSPITAL",
      "Address1": "529 CENTRAL AVENUE",
      "City": "DUNKIRK",
      "State": "NY",
      "ZIP Code": "14048",
      "County Name": "CHAUTAUQUA",
      "Phone Number": "7163661111",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330132'",
      "Hospital Name": "TLC HEALTH NETWORK",
      "Address1": "100 MEMORIAL DRIVE",
      "City": "GOWANDA",
      "State": "NY",
      "ZIP Code": "14070",
      "County Name": "CATTARAUGUS",
      "Phone Number": "7165323377",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330188'",
      "Hospital Name": "MOUNT ST MARY'S HOSPITAL AND  HEALTH CENTER",
      "Address1": "5300 MILITARY ROAD",
      "City": "LEWISTON",
      "State": "NY",
      "ZIP Code": "14092",
      "County Name": "NIAGARA",
      "Phone Number": "7162974800",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Church",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330163'",
      "Hospital Name": "EASTERN NIAGARA HOSPITAL",
      "Address1": "521 EAST AVENUE",
      "City": "LOCKPORT",
      "State": "NY",
      "ZIP Code": "14094",
      "County Name": "NIAGARA",
      "Phone Number": "7165145700",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330053'",
      "Hospital Name": "MEDINA MEMORIAL HOSPITAL",
      "Address1": "200 OHIO STREET",
      "City": "MEDINA",
      "State": "NY",
      "ZIP Code": "14103",
      "County Name": "ORLEANS",
      "Phone Number": "5857988111",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330111'",
      "Hospital Name": "BERTRAND CHAFFEE HOSPITAL",
      "Address1": "224 EAST MAIN STREET",
      "City": "SPRINGVILLE",
      "State": "NY",
      "ZIP Code": "14141",
      "County Name": "ERIE",
      "Phone Number": "7165922871",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330354'",
      "Hospital Name": "ROSWELL PARK CANCER INSTITUTE",
      "Address1": "ELM AND CARLTON STREETS",
      "City": "BUFFALO",
      "State": "NY",
      "ZIP Code": "14203",
      "County Name": "ERIE",
      "Phone Number": "7168452300",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330005'",
      "Hospital Name": "KALEIDA HEALTH",
      "Address1": "726 EXCHANGE STREET, SUITE 522",
      "City": "BUFFALO",
      "State": "NY",
      "ZIP Code": "14210",
      "County Name": "ERIE",
      "Phone Number": "7168598620",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330078'",
      "Hospital Name": "SISTERS OF CHARITY HOSPITAL",
      "Address1": "2157 MAIN STREET",
      "City": "BUFFALO",
      "State": "NY",
      "ZIP Code": "14214",
      "County Name": "ERIE",
      "Phone Number": "7168621000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Church",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'33012F'",
      "Hospital Name": "UPSTATE NEW YORK VA HEALTHCARE SYSTEM - WESTERN NY",
      "Address1": "3495 BAILEY AVENUE",
      "City": "BUFFALO",
      "State": "NY",
      "ZIP Code": "14215",
      "County Name": "NULL",
      "Phone Number": "7168623611",
      "Hospital Type": "ACUTE CARE - VETERANS ADMINISTRATION",
      "Hospital Ownership": "Government Federal",
      "Emergency Service": "NO"
    },
    {
      "Provider Number": "'330219'",
      "Hospital Name": "ERIE COUNTY MEDICAL CENTER",
      "Address1": "462 GRIDER STREET",
      "City": "BUFFALO",
      "State": "NY",
      "ZIP Code": "14215",
      "County Name": "ERIE",
      "Phone Number": "7168983936",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Government - Local",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330102'",
      "Hospital Name": "KENMORE MERCY HOSPITAL",
      "Address1": "2950 ELMWOOD AVENUE",
      "City": "KENMORE",
      "State": "NY",
      "ZIP Code": "14217",
      "County Name": "ERIE",
      "Phone Number": "7164476100",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Church",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330279'",
      "Hospital Name": "MERCY HOSPITAL",
      "Address1": "565 ABBOTT ROAD",
      "City": "BUFFALO",
      "State": "NY",
      "ZIP Code": "14220",
      "County Name": "ERIE",
      "Phone Number": "7168267000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Church",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330065'",
      "Hospital Name": "NIAGARA FALLS MEMORIAL MEDICAL CENTER",
      "Address1": "621 TENTH STREET",
      "City": "NIAGARA FALLS",
      "State": "NY",
      "ZIP Code": "14302",
      "County Name": "NIAGARA",
      "Phone Number": "7162784000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Other",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330074'",
      "Hospital Name": "F F THOMPSON HOSPITAL",
      "Address1": "350 PARRISH STREET",
      "City": "CANANDAIGUA",
      "State": "NY",
      "ZIP Code": "14424",
      "County Name": "ONTARIO",
      "Phone Number": "5853966000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'33013F'",
      "Hospital Name": "CANANDAIGUA VA MEDICAL CENTER",
      "Address1": "400 FOOT HILL AVE.",
      "City": "CANANDAIGUA",
      "State": "NY",
      "ZIP Code": "14424",
      "County Name": "NULL",
      "Phone Number": "5853942000",
      "Hospital Type": "ACUTE CARE - VETERANS ADMINISTRATION",
      "Hospital Ownership": "Government Federal",
      "Emergency Service": "NO"
    },
    {
      "Provider Number": "'330265'",
      "Hospital Name": "CLIFTON SPRINGS HOSPITAL AND CLINIC",
      "Address1": "2 COULTER ROAD",
      "City": "CLIFTON SPRINGS",
      "State": "NY",
      "ZIP Code": "14432",
      "County Name": "ONTARIO",
      "Phone Number": "3154629561",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330238'",
      "Hospital Name": "NICHOLAS H NOYES MEMORIAL HOSPITAL",
      "Address1": "111  CLARA BARTON STREET",
      "City": "DANSVILLE",
      "State": "NY",
      "ZIP Code": "14437",
      "County Name": "LIVINGSTON",
      "Phone Number": "5853356001",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330058'",
      "Hospital Name": "GENEVA GENERAL HOSPITAL",
      "Address1": "196 -198 NORTH STREET",
      "City": "GENEVA",
      "State": "NY",
      "ZIP Code": "14456",
      "County Name": "ONTARIO",
      "Phone Number": "3157874175",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330030'",
      "Hospital Name": "NEWARK-WAYNE COMMUNITY HOSPITAL",
      "Address1": "111 DRIVING PARK AVENUE",
      "City": "NEWARK",
      "State": "NY",
      "ZIP Code": "14513",
      "County Name": "WAYNE",
      "Phone Number": "3153322022",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'331314'",
      "Hospital Name": "SOLDIERS AND SAILORS MEMORIAL HOSPITAL OF YATES",
      "Address1": "418 NORTH MAIN STREET",
      "City": "PENN YAN",
      "State": "NY",
      "ZIP Code": "14527",
      "County Name": "YATES",
      "Phone Number": "3157874175",
      "Hospital Type": "Critical Access Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330008'",
      "Hospital Name": "WYOMING COUNTY COMMUNITY HOSPITAL",
      "Address1": "400 NORTH MAIN STREET",
      "City": "WARSAW",
      "State": "NY",
      "ZIP Code": "14569",
      "County Name": "WYOMING",
      "Phone Number": "5857862233",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Government - Local",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330164'",
      "Hospital Name": "HIGHLAND HOSPITAL",
      "Address1": "1000 SOUTH AVENUE",
      "City": "ROCHESTER",
      "State": "NY",
      "ZIP Code": "14620",
      "County Name": "MONROE",
      "Phone Number": "5854732200",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330403'",
      "Hospital Name": "MONROE COMMUNITY HOSPITAL",
      "Address1": "435 EAST HENRIETTA ROAD",
      "City": "ROCHESTER",
      "State": "NY",
      "ZIP Code": "14620",
      "County Name": "MONROE",
      "Phone Number": "5857606500",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Government - State",
      "Emergency Service": "No"
    },
    {
      "Provider Number": "'330125'",
      "Hospital Name": "ROCHESTER GENERAL HOSPITAL",
      "Address1": "1425 PORTLAND AVENUE",
      "City": "ROCHESTER",
      "State": "NY",
      "ZIP Code": "14621",
      "County Name": "MONROE",
      "Phone Number": "5859224000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330226'",
      "Hospital Name": "UNITY HOSPITAL OF ROCHESTER",
      "Address1": "1555 LONG POND ROAD",
      "City": "ROCHESTER",
      "State": "NY",
      "ZIP Code": "14626",
      "County Name": "MONROE",
      "Phone Number": "5857237000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330285'",
      "Hospital Name": "STRONG MEMORIAL HOSPITAL",
      "Address1": "601 ELMWOOD AVE",
      "City": "ROCHESTER",
      "State": "NY",
      "ZIP Code": "14642",
      "County Name": "MONROE",
      "Phone Number": "5852752121",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330239'",
      "Hospital Name": "WOMAN'S CHRISTIAN ASSOCIATION",
      "Address1": "207 FOOTE AVENUE",
      "City": "JAMESTOWN",
      "State": "NY",
      "ZIP Code": "14701",
      "County Name": "CHAUTAUQUA",
      "Phone Number": "7164870141",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'331301'",
      "Hospital Name": "CUBA MEMORIAL HOSPITAL INC",
      "Address1": "140 WEST MAIN STREET",
      "City": "CUBA",
      "State": "NY",
      "ZIP Code": "14727",
      "County Name": "ALLEGANY",
      "Phone Number": "5859612000",
      "Hospital Type": "Critical Access Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330103'",
      "Hospital Name": "OLEAN GENERAL HOSPITAL",
      "Address1": "515 MAIN STREET",
      "City": "OLEAN",
      "State": "NY",
      "ZIP Code": "14760",
      "County Name": "CATTARAUGUS",
      "Phone Number": "7163732600",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Proprietary",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330166'",
      "Hospital Name": "WESTFIELD MEMORIAL HOSPITAL INC",
      "Address1": "189 EAST MAIN STREET",
      "City": "WESTFIELD",
      "State": "NY",
      "ZIP Code": "14787",
      "County Name": "CHAUTAUQUA",
      "Phone Number": "7163264921",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'33011F'",
      "Hospital Name": "BATH VA MEDICAL CENTER",
      "Address1": "76 VETERANS AVE.",
      "City": "BATH",
      "State": "NY",
      "ZIP Code": "14810",
      "County Name": "NULL",
      "Phone Number": "6076644000",
      "Hospital Type": "ACUTE CARE - VETERANS ADMINISTRATION",
      "Hospital Ownership": "Government Federal",
      "Emergency Service": "NO"
    },
    {
      "Provider Number": "'330144'",
      "Hospital Name": "IRA DAVENPORT MEMORIAL HOSPITAL INC",
      "Address1": "7571 STATE ROUTE 54",
      "City": "BATH",
      "State": "NY",
      "ZIP Code": "14810",
      "County Name": "STEUBEN",
      "Phone Number": "6077768500",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Other",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330277'",
      "Hospital Name": "CORNING HOSPITAL",
      "Address1": "176 DENISON PARKWAY EAST",
      "City": "CORNING",
      "State": "NY",
      "ZIP Code": "14830",
      "County Name": "STEUBEN",
      "Phone Number": "6079377200",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330151'",
      "Hospital Name": "ST JAMES MERCY HOSPITAL",
      "Address1": "411 CANISTEO STREET",
      "City": "HORNELL",
      "State": "NY",
      "ZIP Code": "14843",
      "County Name": "STEUBEN",
      "Phone Number": "6073248000",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Church",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330307'",
      "Hospital Name": "CAYUGA MEDICAL CENTER AT ITHACA",
      "Address1": "101 DATES DRIVE",
      "City": "ITHACA",
      "State": "NY",
      "ZIP Code": "14850",
      "County Name": "TOMPKINS",
      "Phone Number": "6072744401",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'331313'",
      "Hospital Name": "SCHUYLER HOSPITAL INC",
      "Address1": "220 STEUBEN STREET",
      "City": "MONTOUR FALLS",
      "State": "NY",
      "ZIP Code": "14865",
      "County Name": "SCHUYLER",
      "Phone Number": "6075307121",
      "Hospital Type": "Critical Access Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330096'",
      "Hospital Name": "JONES MEMORIAL HOSPITAL",
      "Address1": "191 NORTH MAIN STREET",
      "City": "WELLSVILLE",
      "State": "NY",
      "ZIP Code": "14895",
      "County Name": "ALLEGANY",
      "Phone Number": "5855931100",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330108'",
      "Hospital Name": "ST JOSEPH'S HOSPITAL INC",
      "Address1": "555 ST JOSEPH'S BLVD",
      "City": "ELMIRA",
      "State": "NY",
      "ZIP Code": "14902",
      "County Name": "CHEMUNG",
      "Phone Number": "6077336541",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    },
    {
      "Provider Number": "'330090'",
      "Hospital Name": "ARNOT OGDEN MEDICAL CENTER",
      "Address1": "600 ROE AVENUE",
      "City": "ELMIRA",
      "State": "NY",
      "ZIP Code": "14905",
      "County Name": "CHEMUNG",
      "Phone Number": "6077374100",
      "Hospital Type": "Acute Care Hospitals",
      "Hospital Ownership": "Voluntary non-profit - Private",
      "Emergency Service": "Yes"
    }
  ]
};

// create an array of NY hospitals 
function hospitals_to_array(hospitals_json_raw) {
	var array = [];
	var hospitals = hospitals_json_raw["Sheet1"];
	var i;
	for (i = 0; i != hospitals.length; i++) {
		array.push({
		name: hospitals[i]["Hospital Name"],
		address: hospitals[i]["Address1"] + ", " + hospitals[i]["City"] + ", " + hospitals[i]["State"] + ", " + hospitals[i]["ZIP Code"],
		phone:  hospitals[i]["Phone Number"],
		type: hospitals[i]["Hospital Type"],
		ownership: hospitals[i]["Hospital Ownership"]})
	}
	return array;
}

var hospitals = hospitals_to_array(hospitals_json_raw);

// initialize the map and Geocoder
function initialize() {
  geocoder = new google.maps.Geocoder();
  // start over Beantown
  var latlng = new google.maps.LatLng(42.365579, -71.037598);
  var mapOptions = {
    zoom: 14,
    zoomControl: true,
    zoomControlOptions: {
        position: google.maps.ControlPosition.LEFT_CENTER
    },
    panControl: false,
    mapTypeControl: false,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  
  // object holding configuration of circle
  var populationOptions = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.35,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    map: map,
    center: latlng,
    radius: 1000
  };
  // create circle
  cityCircle = new google.maps.Circle(populationOptions);
  // keep from chowing circle too early
  cityCircle.setMap(null);
}

// set map where user specified and return latlng of that location
function codeAddress() {
  // clear any markers currently on map
  console.log(markersArray)
  console.log(hospitalsTable)
  clearOverlays();
  // get user input
  var address = document.getElementById('address').value;
  radius = parseInt(document.getElementById('radius').value) * 1609.34;
  // geocodes user input location and moves map here
  geocoder.geocode( { 'address': address }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      
      // save coordinates of user location
      center = results[0].geometry.location;
      
      // set map at user location
      map.setCenter(center);
      
      // place circle on map indicating range 
      cityCircle.setCenter(center);
      cityCircle.setRadius(radius);
      cityCircle.setMap(map);
      
      // find all nearby hospitals and place their location on map
	  delay = 0;
	  function doSetTimeout(i) {	  
      setTimeout(function() {computeLatLng(center, hospitals[i])}, delay);
	  delay += 2500;
      }
      for (var i = 0; i < hospitals.length; i++) {
       doSetTimeout(i);
      }
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
  
// computes distance and checks if it is within threshold defined by user
function determineIfNear(center, pos) {
  console.log(center);
  var dist = google.maps.geometry.spherical.computeDistanceBetween(center, pos);
  console.log(dist);
  if (dist <= radius) {
    return true;
  } else {
    return false;
  }
};

var hospitalsTable = []
  
// geocodes address of hospital
function computeLatLng(center, hospital){
  geocoder.geocode( { 'address': hospital.address }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      hloc = results[0].geometry.location; // location of hospital
      var near_huh = determineIfNear(center, hloc);
      if (near_huh) {
        var marker = createMarker(hloc, hospital)
        markersArray.push(marker);
		hospitalsTable.push(hospital);
		document.getElementById("hospitals_info").innerHTML = 
		document.getElementById("hospitals_info").innerHTML 
		+ "<tr><td data-toggle='modal' data-id=" + hospital.phone + " data-target='#orderModal'>" + hospital.name + "</td><td>" 
		+ hospital.address + "</td><td>" 
		+ hospital.phone + "</td><td>" 
		+ hospital.type + "</td>"
		+ "<td><input type='checkbox' value=" + hospital.name + "></td></tr>";
		console.log(hospitalsTable)
      }
	} else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

// clears map of markers
function clearOverlays() {
  for (var i = 0; i < markersArray.length; i++ ) {
    console.log(markersArray[i])
    markersArray[i].setMap(null);
  }
  markersArray = [];
}

$(function(){
    $('#orderModal').modal({
        keyboard: true,
        backdrop: "static",
        show:false,

    }).on('show', function(){ //subscribe to show method
          var phone = $(event.target).closest('td').data('id'); //get the id from td
		  var hospital = findHospital(phone.toString())
		  var name = hospital["Hospital Name"]
		  var address = hospital.Address1 + ", " + hospital.City + ", " + hospital.State
		  var type = hospital["Hospital Type"]
		  var ownership = hospital["Hospital Ownership"]
		  var emergency = hospital["Emergency Service"]
        //make your ajax call populate items or what even you need
        $(this).find('#name').html($('<p> Hospital Name: ' + name + '</p>' ))
		$(this).find('#address').html($('<p> Address: ' + address  + '</p>'))
		$(this).find('#phone').html($('<p> Phone: ' + phone + '</p>'))
		$(this).find('#type').html($('<p> Hospital Type: ' + type + '</p>'))
		$(this).find('#ownership').html($('<p> Hospital Ownership: ' + ownership + '</p>'))
		$(this).find('#emergency').html($('<p> Emergency Service: ' + emergency + '</p>'))
    });
});

function findHospital(phone) {
  var hospitals = hospitals_json_raw["Sheet1"];
  for (var i=0; i < hospitals.length; i++)
    if (hospitals[i]["Phone Number"] == phone)
      break;
	  return hospitals[i];
}

// generates marker based on hospital location
function createMarker(pos, hospital) {
  var marker = new google.maps.Marker({       
    position: pos, 
    map: map,  // google.maps.Map 
    title: hospital.name      
  }); 
  // makes marker clickable
  google.maps.event.addListener(marker, 'click', function() { 
    // remove any open info windows
    if (infowindow) {
      infowindow.close();
    }
    createInfoWindowContent(hospital);
    infowindow.open(map,marker); 
  }); 
  return marker;  
}

// Generate content of info window based on hospital
function createInfoWindowContent(hospital) {
  var contentString = '<div id="content">'+
    '<div id="siteNotice">'+
    '</div>'+
    '<h1 id="firstHeading" class="firstHeading">' + hospital.name + '</h1>'+
    '<div id="bodyContent">'+
    '<p><b>Address: </b>'+ hospital.address + '</p>'+
    '<p><b>Phone Number: </b>'+ hospital.phone + '</p>'+
    '<p><b>Type: </b>' + hospital.type + '</p>'+
    '<p><b>Ownership: </b>' + hospital.ownership + '</p>'+
    '</div></div>';
  infowindow = new google.maps.InfoWindow({
    content: contentString,
    maxWidth: 300
  });
}  

// runs initial search from lightbox
// just loads values into map header search boxes and searches
function initialSearch() {
  var address = document.getElementById('lightLocation').value;
  var range = document.getElementById('lightRange').value;
  $('#lightboxform').modal('hide');
  $('#header').css("display", "inline");
  $('#address').val(address);
  $('#radius').val(range);
  $('#searchbtn').click();
}

google.maps.event.addDomListener(window, 'load', initialize);