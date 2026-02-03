/**
 * BC Pet Registry Tattoo Code Lookup Module
 * Version: 1.0.0
 * 
 * Provides tattoo code parsing and facility lookup functionality
 * for the VOKRA Adoption Follow-up Email Generator
 */

(function(window) {
  'use strict';

  // ============================================
  // YEAR CODE MAPPING
  // ============================================
  // Letters D, I, O, Q, U are excluded from the year code system
  const YEAR_CODES = {
    'A': [2013], 'B': [2014], 'C': [2015], 'E': [2016], 'F': [2017],
    'G': [2018], 'H': [2019], 'J': [2020], 'K': [2021], 'L': [2001, 2022],
    'M': [2002, 2023], 'N': [2003, 2024], 'P': [2004, 2025], 'R': [2005, 2026],
    'S': [2006], 'T': [2007], 'V': [2008], 'W': [2009], 'X': [2010],
    'Y': [2011], 'Z': [2012]
  };

  // ============================================
  // FACILITY CODES DATABASE
  // ============================================
  // Complete database from BC Pet Registry Tattoo Code Guide 2026
    const FACILITY_CODES = {
    'AA': { name: 'Vancouver Veterinary Hospital', location: 'Vancouver' },
    'AB': { name: 'BC SPCA Animal Hospital', location: 'Vancouver' },
    'AC': { name: 'Anderson Animal Hospital', location: 'Vancouver', closed: true, note: 'Merged with Vancouver South Animal Hospital June 2020' },
    'AD': { name: 'Aberdeen Animal Hospital', location: 'Burnaby', closed: true },
    'AE': { name: 'Terrace Veterinary Hospital', location: 'Terrace', closed: true },
    'AF': { name: 'Animal Care Clinic & Hospital FC/Fairview Van', location: 'BC', closed: true, note: 'No records available since 1997' },
    'AG': { name: 'Austin Animal Hospital', location: 'Coquitlam', closed: true },
    'AH': { name: 'All Critters Animal Hospital Fleetwood', location: 'Surrey' },
    'AJ': { name: 'Arbutus West Animal Clinic', location: 'Vancouver' },
    'AK': { name: 'Ocean Park Veterinary Clinic', location: 'Surrey' },
    'AL': { name: 'Alouette Animal Hosp', location: 'Maple Ridge' },
    'AM': { name: 'Aldergrove Animal Hospital', location: 'Aldergrove' },
    'AN': { name: 'Aldor Veterinary Clinic', location: 'Langley' },
    'AP': { name: 'Animal Medical Hospital', location: 'West Van' },
    'AR': { name: 'Ambleside Animal Hospital', location: 'West Van' },
    'AS': { name: 'Allondale Animal Hospital', location: 'Surrey' },
    'AT': { name: 'Armstrong Veterinary Clinic', location: 'BC' },
    'AV': { name: 'King George Veterinary Hospital', location: 'Surrey' },
    'AX': { name: 'No. 2 Road Animal Hosp', location: 'Richmond' },
    'AY': { name: 'Accord Veterinary Services', location: 'Kamloops', closed: true },
    'BA': { name: 'Burquitlam Animal Hosp', location: 'Coquitlam' },
    'BB': { name: 'Burton Veterinary Services', location: 'Abbotsford' },
    'BC': { name: 'Blue Cross Pet Hospital', location: 'Vancouver' },
    'BE': { name: 'North Burnaby Pet Hosp', location: 'North Burnaby' },
    'BF': { name: 'Dolphin Veterinary Services', location: 'Langley' },
    'BG': { name: 'Coast Mountain Vet Services', location: 'Whistler' },
    'BH': { name: 'Bulkley Valley Vet Clinic', location: 'Smithers', closed: true },
    'BJ': { name: 'Atlas Animal Hospital-North Vancouver', location: 'BC' },
    'BK': { name: 'Newton Animal Hospital', location: 'Surrey' },
    'BM': { name: 'Acadia Veterinary Clinic', location: 'Vancouver' },
    'BN': { name: 'Care Pet Wellness Burnaby/New West', location: 'BC' },
    'BP': { name: 'Pacific Dental Service for Animals', location: 'Princeton', closed: true },
    'BR': { name: 'Blueridge Cove Animal Hosp', location: 'North Van' },
    'BS': { name: 'South Burnaby Veterinary Hospital', location: 'Burnaby' },
    'BT': { name: 'Eagle Road Animal Hospital', location: 'Mission', closed: true, note: 'Records held by Eagle Hill Animal Hospital - AGJ' },
    'BV': { name: 'Burnaby Veterinary Hospital', location: 'Burnaby' },
    'BW': { name: 'Brookswood Veterinary Hosp', location: 'Langley' },
    'BX': { name: 'Greenbelt Veterinary Services', location: 'Chilliwack' },
    'BY': { name: 'Pineview Pet Hospital', location: 'Aldergrove', closed: true },
    'CA': { name: 'Cambie Animal Hospital', location: 'Vancouver', closed: true, note: 'Merged with Vancouver South Animal Hospital June 2020' },
    'CB': { name: 'Coast Meridian Animal Hosp', location: 'Port Coquitlam' },
    'CC': { name: 'Cranbrook Veterinary Hospital', location: 'Cranbrook' },
    'CD': { name: 'Cedar Hills Animal Hospital', location: 'Surrey' },
    'CF': { name: 'Central Animal Hospital', location: 'Kamloops' },
    'CG': { name: 'Aaron Animal Hospital', location: 'Cloverdale' },
    'CH': { name: 'Central Veterinary Clinic', location: 'Chilliwack' },
    'CK': { name: 'Lifetime Pet Care Practice of Strawberry Hill', location: 'Surrey' },
    'CL': { name: 'Coquitlam Animal Hospital', location: 'Coquitlam' },
    'CN': { name: 'Cats Only Vet Clinic', location: 'Vancouver' },
    'CP': { name: 'Central Park Veterinary Hospital', location: 'Burnaby', closed: true },
    'CR': { name: 'Cheam View Vet Hospital', location: 'Chilliwack' },
    'CS': { name: 'Capilano Pet Hospital', location: 'North Van', closed: true },
    'CT': { name: 'Cat Hospital', location: 'The, West Vancouver', closed: true },
    'CV': { name: 'Tri-Lake Animal Hospital', location: 'Winfield' },
    'CW': { name: 'Champlain Animal Clinic', location: 'Vancouver' },
    'CX': { name: 'Nelson Animal Hospital', location: 'Nelson' },
    'CY': { name: 'Chetwynd Veterinary Hospital', location: 'Chetwynd' },
    'DA': { name: 'Dear Animal Hospital', location: 'The, Richmond', closed: true, note: 'Closed 05/10/18, records held by Island Animal Hospital – HH' },
    'DB': { name: 'Dunbar Veterinary Hospital', location: 'Vancouver', closed: true },
    'DC': { name: 'Care Pet Wellness Group-Seymour Animal', location: 'BC', closed: true },
    'DD': { name: 'Westview Vet Hospital', location: 'Powell River' },
    'DE': { name: 'South Valley Veterinary Hospital', location: 'Osoyoos' },
    'DF': { name: 'Vancouver City Pound', location: 'Vancouver' },
    'DH': { name: 'Sunshine Hills Veterinary Clinic', location: 'Delta' },
    'DJ': { name: 'Creston Veterinary Hospital', location: 'Creston' },
    'DK': { name: 'Dawson Creek Vet Clinic', location: 'Dawson Creek' },
    'DL': { name: 'South Valley Vet Hospital', location: 'Keremeos', closed: true },
    'DM': { name: 'Dewdney Animal Hospital', location: 'Maple Ridge' },
    'DN': { name: 'North & West Van Mobile Veterinary Services', location: 'BC' },
    'DP': { name: 'Central Animal Hospital', location: 'Vernon' },
    'DR': { name: 'Queen Charlotte Island Animal Hospital', location: 'Tlell' },
    'DS': { name: 'Vernon Veterinary Clinic', location: 'Vernon' },
    'DV': { name: 'Dundarave Vet Clinic', location: 'West Vancouver', closed: true },
    'DW': { name: 'Castlegar Veterinary Hospital', location: 'Castlegar' },
    'DX': { name: 'Boundary Animal Hospital', location: 'BC' },
    'DY': { name: 'Driftwood Veterinary Clinic', location: 'Houston', closed: true },
    'EA': { name: 'Ellis Animal Hospital', location: 'Kelowna', closed: true },
    'EC': { name: 'Central City Animal Hospital', location: 'New West' },
    'EE': { name: 'Pacific Equine Clinic', location: 'Surrey' },
    'EF': { name: 'Eagle Ridge Veterinary Hospital', location: 'Sechelt' },
    'EH': { name: 'Vancouver Animal Emerg. Clinic', location: 'Vancouver' },
    'EJ': { name: 'Terra Nova Village Veterinarian', location: 'Richmond' },
    'EK': { name: 'West Kelowna Animal Hospital', location: 'BC' },
    'EL': { name: 'Kitsilano Animal Clinic', location: 'Vancouver' },
    'EN': { name: 'Nicola Valley Veterinary Clinic', location: 'Merritt', closed: true, note: 'Closed 12/31/18, records held by Merritt Veterinary Hospital – ME' },
    'ER': { name: 'Eagle Ridge Animal & Bird Hosp.', location: 'Coquitlam' },
    'ES': { name: 'Dr. R. Estensen', location: 'Abbotsford', closed: true },
    'ET': { name: 'Valleyview Veterinary Clinic', location: 'Kamloops' },
    'EV': { name: 'Garibaldi Vet Hosp', location: 'Garibaldi Highlands' },
    'EW': { name: 'Surrey Animal Hospital', location: 'Surrey' },
    'EX': { name: 'Bakerview Pet Hospital', location: 'Abbotsford', closed: true, note: 'Records held by Elwood Animal Hospital – PP' },
    'EY': { name: 'West Kootenay Animal Hospital', location: 'Trail' },
    'FA': { name: 'Vetcetera Pet Hospital of Richmond', location: 'BC', closed: true, note: 'New name/code: Central Richmond Pet Hospital - ACV' },
    'FB': { name: 'Arrow Lake Veterinary Hospital', location: 'Castlegar' },
    'FC': { name: 'S. Cariboo Animal Hosp', location: '100 Mile House', closed: true },
    'FD': { name: 'Mackenzie Veterinary Clinic', location: 'MacKenzie .', closed: true, note: 'Closed as of September 1, 2019. For medical records, contact Chetwynd Veterinary Hospital at 250-788-9374' },
    'FE': { name: 'Vetcetera Pet Hosp', location: 'Lougheed/Pinetree', closed: true, note: 'New name/code: Oxford Animal Hospital - ACU' },
    'FF': { name: 'Squamish Veterinary Hospital', location: 'Squamish', closed: true },
    'FG': { name: 'Fairfield Animal Hospital', location: 'Kelowna' },
    'FH': { name: 'Fraser Heights Animal Hospital', location: 'Surrey' },
    'FJ': { name: 'North Peace Vet Clinic', location: 'Fort St. John' },
    'FL': { name: 'Fort Langley Veterinary Clinic', location: 'Fort Langley' },
    'FN': { name: 'Central Langley Pet Hospital', location: 'Langley' },
    'FP': { name: 'Fraser Pet Hospital', location: 'Vancouver', closed: true },
    'FR': { name: 'Mills Veterinary Services', location: 'Armstrong' },
    'FS': { name: 'Ospika Animal Hospital', location: 'Prince George', note: 'Former name: All-Mobile Veterinary Services' },
    'FT': { name: 'Leishman Veterinary Services', location: 'Mission', closed: true },
    'FV': { name: 'Fraserview Animal Clinic', location: 'Vancouver', closed: true },
    'FW': { name: 'Tumbler Ridge Vet Clinic', location: 'Tumbler Ridge', closed: true },
    'FX': { name: 'Alexander Mobile Equine Surgery', location: 'Langley', closed: true },
    'FY': { name: 'Anderson Veterinary Clinic', location: 'Penticton' },
    'GA': { name: 'Kimberly Veterinary Clinic', location: 'Kimberley' },
    'GB': { name: 'Gibsons Animal Hospital', location: 'Gibsons', closed: true },
    'GC': { name: 'Garden City Veterinary Hospital', location: 'Richmond' },
    'GD': { name: 'Vanderhoof Veterinary Clinic', location: 'Vanderhoof' },
    'GE': { name: 'Olson Animal Hospital', location: 'Prince George', closed: true },
    'GF': { name: 'Glenn Mountain Animal Hospital', location: 'Abbotsford' },
    'GG': { name: 'Chilliwack Veterinary Clinic', location: 'Chilliwack', closed: true },
    'GH': { name: 'Guildford Animal Hospital', location: 'Surrey' },
    'GJ': { name: 'Gresley-Jones Veterinary Services', location: 'Trail', closed: true },
    'GK': { name: 'Lakeland Vet Clinic', location: '100 Mile House' },
    'GL': { name: 'Cache Creek Veterinary Hospital', location: 'BC' },
    'GM': { name: 'White Rock Veterinary Hospital', location: 'White Rock' },
    'GN': { name: 'Nechako Veterinary Clinic', location: 'Langley', closed: true },
    'GP': { name: 'Point Grey Veterinary Clinic', location: 'Vancouver' },
    'GR': { name: 'Steveston Veterinary Hospital', location: 'Richmond' },
    'GS': { name: 'Granville Island Veterinary Hospital', location: 'Vancouver' },
    'GT': { name: 'Abbotsford Veterinary Clinic', location: 'Abbotsford' },
    'GV': { name: 'Valley Veterinary Services', location: 'Chilliwack' },
    'GW': { name: 'Riverside Small Animal Hospital', location: 'Kamloops 48th GY Avenue Animal Hospital, Ladner' },
    'GX': { name: 'Country Grove Vet Clinic', location: 'Aldergrove' },
    'HA': { name: 'Care Pet Wellness Group Highlands Animal Hosp.', location: 'North Van' },
    'HB': { name: 'Night Owl Bird Hospital', location: 'Vancouver' },
    'HC': { name: 'Mayne Island Veterinary Clinic', location: 'Mayne Island' },
    'HD': { name: 'Hill ‘n Dale Animal Hospital', location: 'Mission', closed: true },
    'HE': { name: 'Penticton Veterinary Hospital', location: 'Penticton' },
    'HF': { name: 'Huff Animal Hospital', location: 'Delta' },
    'HG': { name: 'Valley Veterinary Clinic', location: 'Windermere', closed: true },
    'HH': { name: 'Island Veterinary Hospital', location: 'Richmond' },
    'HJ': { name: 'Hornby Veterinary Clinic', location: 'Hornby Island', closed: true },
    'HK': { name: 'Summerland Animal Clinic', location: 'Summerland' },
    'HL': { name: 'The Lions Vet Clinic', location: 'North Vancouver', closed: true },
    'HM': { name: 'Tsawwassen Animal Hospital', location: 'Delta' },
    'HN': { name: 'Oak Animal Hospital', location: 'Vancouver' },
    'HP': { name: 'Vancouver Animal Wellness Hosp.', location: 'Van' },
    'HR': { name: 'Port Coquitlam Animal Hospital', location: 'Port Coquitlam' },
    'HS': { name: 'Chase Veterinary Clinic', location: 'Chase' },
    'HT': { name: 'Invermere Veterinary Hospital', location: 'Invermere' },
    'HV': { name: 'Hollyburn Veterinary Clinic', location: 'West Vancouver' },
    'HW': { name: 'Babine Pet Hospital', location: 'Smithers' },
    'HX': { name: 'The Cat Hospital', location: 'West Vancouver', closed: true },
    'HY': { name: 'Harbourside Vet Housecall Service', location: 'North Van' },
    'JA': { name: 'Sardis Animal Hospital', location: 'Sardis' },
    'JB': { name: 'Jade Bay Veterinary Services Oyama', location: 'BC', closed: true },
    'JC': { name: 'Shuswap Veterinary Clinic', location: 'Salmon Arm' },
    'JD': { name: 'Prince George Vet Hospital', location: 'Prince George' },
    'JE': { name: 'Sechelt Animal Hospital', location: 'Sechelt' },
    'JF': { name: 'Sitara Animal Hospital', location: 'Kelowna' },
    'JG': { name: 'Animal Medical Clinic-Okanagan', location: 'Penticton', closed: true, note: 'Closed June 2020, For records, contact Dr. George Proudfoot at South Okanagan Animal Care Centre' },
    'JH': { name: 'Cypress St. Animal Hospital', location: 'Vancouver' },
    'JJ': { name: 'Pawsitive Veterinary Care', location: 'Kelowna' },
    'JK': { name: 'Avon Animal Hospital', location: 'Surrey' },
    'JL': { name: 'Urban Animal Hospital', location: 'Vancouver' },
    'JM': { name: 'Richmond Animal Hospital', location: 'Richmond' },
    'JN': { name: 'Panorama Veterinary Services', location: 'Winfield' },
    'JP': { name: 'West Boulevard Vet Clinic', location: 'Vancouver' },
    'JR': { name: 'Kettle River Veterinary Service', location: 'Grand Forks', closed: true },
    'JS': { name: 'South Surrey Veterinary Hospital', location: 'Surrey' },
    'JT': { name: 'South Peace Animal Hosp.', location: 'Dawson Creek', closed: true, note: 'Closed 12/21/18, for records email southpeaceanimalhospital@hotmail.com' },
    'KA': { name: 'Kamloops Vet Clinic', location: 'Kamloops' },
    'KB': { name: 'Kent Veterinary Clinic', location: 'Agassiz' },
    'KC': { name: 'Kelowna Vet Hospital', location: 'Kelowna' },
    'KD': { name: 'Kerrisdale Veterinary Hospital', location: 'Vancouver' },
    'KE': { name: 'Parkside Veterinary Hospital', location: 'Kitimat', closed: true },
    'KF': { name: 'Oliver Veterinary Hospital', location: 'Oliver' },
    'KG': { name: 'Chinook Veterinary Services', location: 'Williams Lake' },
    'KH': { name: 'Kennedy Heights Animal & Bird Hosp.', location: 'Surrey' },
    'KJ': { name: 'Okanagan Veterinary Hospital', location: 'Kelowna' },
    'KK': { name: 'Kootenay Animal Clinic', location: 'Creston', closed: true },
    'KL': { name: 'Creekside Animal Clinic', location: 'Vernon' },
    'KM': { name: 'Abbotsford Veterinary Hospital', location: 'Abbotsford', closed: true },
    'KN': { name: 'Rutland Pet Hospital', location: 'Kelowna' },
    'KP': { name: 'Pacific Coast Vet Hospital', location: 'Prince Rupert' },
    'KR': { name: 'Knight Road Veterinary Clinic', location: 'Vancouver', closed: true },
    'KS': { name: 'Williams Lake Veterinary Hosp.', location: 'Williams Lake' },
    'KT': { name: 'Coquihalla Veterinary Clinic', location: 'Hope', note: 'Former name: Coquihalla Veterinary Services and Bate Veterinary Clinic' },
    'KV': { name: 'Kingsway Veterinary Clinic', location: 'Vancouver' },
    'KW': { name: 'Quesnel Veterinary Clinic', location: 'Quesnel' },
    'KX': { name: 'Thompson Rivers University', location: 'Kamloops' },
    'KY': { name: 'Kootenay Veterinary Clinic', location: 'Cranbrook .', closed: true, note: 'Closed Feb 2021. records, contact Dr. Gerry MacIntyre at kootenayvetrecords@gmail.com' },
    'LA': { name: 'Langley Animal Clinic/Spay & Neuter Clinic', location: 'Langley' },
    'LB': { name: 'Albatross Vet Services', location: 'Langley' },
    'LC': { name: 'Scottsdale Veterinary Hospital', location: 'Surrey' },
    'LD': { name: 'Coldstream Veterinary Clinic', location: 'Vernon', closed: true },
    'LE': { name: 'Clearbrook Animal Hospital', location: 'Clearbrook' },
    'LF': { name: 'Sunridge Veterinary Clinic', location: 'Vernon' },
    'LG': { name: 'All About Pet Clinic', location: 'Langley' },
    'LJ': { name: 'Steeples Veterinary Clinic', location: 'Cranbrook' },
    'LK': { name: 'Lakeshore Animal Clinic', location: 'Kelowna' },
    'LM': { name: 'Mission Creek Animal Hospital', location: 'Kelowna' },
    'LN': { name: 'Ladner Animal Hospital', location: 'Delta', closed: true },
    'LP': { name: 'Lonsdale Pet Hospital', location: 'North Vancouver' },
    'LS': { name: 'Lindsey Veterinary Hospital', location: 'Penticton' },
    'LT': { name: 'Seafair Animal Clinic', location: 'Richmond' },
    'LV': { name: 'Lynn Valley Vet Clinic', location: 'North Vancouver' },
    'LW': { name: 'Columbia Veterinary Services', location: 'Golden' },
    'LX': { name: 'Pitt Meadows Animal Clinic', location: 'Pitt Meadows' },
    'LY': { name: 'Surdel Animal Hospital', location: 'Delta', closed: true },
    'MA': { name: 'Maple Ridge Veterinary Hospital', location: 'Maple Ridge' },
    'MB': { name: 'CRC Veterinary Hospital', location: 'Dawson Creek', closed: true },
    'MC': { name: 'Marshall Veterinary Hospital', location: 'Quesnel', note: 'Relinquished tattoo code July 29/09' },
    'MD': { name: 'Care Pet Wellness Group Marine Drive', location: 'BC', closed: true },
    'ME': { name: 'Logan Lake Vet Clinic', location: 'Merritt', note: 'Same code as Merritt Veterinary Hospital' },
    'ME': { name: 'Merritt Veterinary Hospital', location: 'Merritt' },
    'MF': { name: 'Mission Veterinary Hospital', location: 'BC' },
    'MG': { name: 'Alta Vista Animal Hospital', location: 'Vancouver' },
    'MH': { name: 'Crescent Beach Vet Clinic', location: 'Surrey' },
    'MJ': { name: 'Metrotown Animal Hospital', location: 'Burnaby' },
    'MK': { name: 'Killarney Animal Hospital', location: 'Vancouver' },
    'ML': { name: 'Walnut Grove Animal Hospital', location: 'Langley' },
    'MM': { name: 'Amherst Veterinary Hospital', location: 'Vancouver' },
    'MR': { name: 'Cedar Grove Animal Hospital', location: 'Mission' },
    'MS': { name: 'Westview Veterinary Services', location: 'North Van' },
    'MT': { name: 'West King Edward Animal Clinic', location: 'Vancouver' },
    'MV': { name: 'Wells Gray Vet Clinic', location: 'Clearwater', closed: true },
    'MW': { name: 'Gladwin Veterinary Clinic', location: 'Abbotsford' },
    'MX': { name: 'Caulfeild Veterinary Hospital', location: 'North Van' },
    'MY': { name: 'Clayton Animal Hospital', location: 'Langley', closed: true },
    'NA': { name: 'Mundy Animal Hospital', location: 'Coquitlam' },
    'NB': { name: 'Central Valley Veterinary Hospital', location: 'Kelowna', note: 'Former name: Vetcetera Pet Hospital' },
    'NC': { name: 'Kensington Animal Hospital', location: 'Burnaby' },
    'ND': { name: 'DeBruin Veterinary Clinic', location: 'Quesnel', closed: true },
    'NE': { name: 'University Veterinary Clinic', location: 'Vancouver' },
    'NG': { name: 'Central Ridge Vet Clinic', location: 'Maple Ridge', closed: true },
    'NH': { name: 'The Burns Lake Veterinary Clinic', location: 'Burns Lake' },
    'NJ': { name: 'Gold Creek Vet Clinic', location: 'Cranbrook', closed: true },
    'NK': { name: 'Fraser Highway Animal Clinic', location: 'Surrey', closed: true },
    'NL': { name: 'Jean Lauder', location: 'Qulchena' },
    'NM': { name: 'Westwood Heights Pet Hospital', location: 'Coquitlam' },
    'NN': { name: 'Animal Care Hospital of Williams Lake', location: 'BC' },
    'NP': { name: 'North Fraser Veterinary Hospital', location: 'Mission', closed: true },
    'NR': { name: 'Fleetwood Vet Services', location: 'Surrey' },
    'NT': { name: 'Trenant Park Pet Clinic', location: 'Ladner' },
    'NV': { name: 'Capitol Hill Animal Hospital', location: 'Burnaby', note: 'Former name: The Coast Cat Clinic' },
    'NW': { name: 'Westbank Animal Care Hospital', location: 'Kelowna' },
    'NX': { name: 'Newlands Veterinary Clinic', location: 'Langley', closed: true },
    'NY': { name: 'Nakusp & Valhalla Vet Clinics', location: 'Nakusp', closed: true },
    'PA': { name: 'Housecall Vet Services of Greater Van.', location: 'Burnaby', closed: true },
    'PB': { name: 'Elk Valley Animal Clinic', location: 'Fernie' },
    'PD': { name: 'Fraser Valley Animal Hospital', location: 'Abbotsford' },
    'PE': { name: 'Bird & Exotic Animal Hospital', location: 'Surrey', closed: true },
    'PF': { name: 'Animal Housecall Practice', location: 'North Van', closed: true },
    'PG': { name: 'Exclusively Cats Hsecal Practice', location: 'Vancouver', closed: true },
    'PH': { name: 'Clayburn Pet Hospital', location: 'Abbotsford' },
    'PJ': { name: 'Mosquito Creek Vet Hosp', location: 'North Vancouver' },
    'PK': { name: 'Como Lake Veterinary Hospital', location: 'Coquitlam' },
    'PL': { name: 'Park Gate Animal & Bird Hospital', location: 'North Van' },
    'PM': { name: 'Murdoch Vet Services', location: 'Prince George' },
    'PN': { name: 'Selkirk Veterinary Hospital', location: 'Nelson' },
    'PP': { name: 'Elwood Park Animal Hospital', location: 'Abbotsford' },
    'PS': { name: 'Andersen Veterinary Services', location: 'Aldergrove' },
    'PT': { name: 'Lansdowne Animal Hospital', location: 'Richmond' },
    'PV': { name: 'Companion Animal Clinic', location: 'Richmond' },
    'PW': { name: 'White Valley Veterinary Services', location: 'Lumby', note: 'Former name: Flater Veterinary Services' },
    'PX': { name: 'Heartland Veterinary Services', location: 'Kelowna' },
    'PY': { name: 'Grand Forks Central Vet Services', location: 'renamed Boundary Country Veterinarian Services Ltd. Closed Oct 2020. For medical records, please email boundarycountryvetservices@gmail.com', closed: true },
    'XA': { name: 'North Kootenay Veterinary Services', location: 'Kaslo' },
    'XC': { name: 'Pet Care Small Animal Vet Serv', location: 'Creston', closed: true },
    'XD': { name: 'North Shore Veterinary Clinic', location: 'North Van' },
    'XF': { name: 'Agwest Group', location: 'Abbotsford', closed: true },
    'XG': { name: 'Aggasiz Animal Hospital', location: 'Aggasiz' },
    'XH': { name: 'Sunwood Vet Hospital', location: 'Coquitlam' },
    'XJ': { name: 'The Animal Clinic of Vancouver', location: 'Vancouver', closed: true },
    'XK': { name: 'Carepoint Vet Hospital', location: 'Chilliwack', closed: true },
    'XL': { name: 'Small Creatures Pet Clinic', location: 'Langley' },
    'XM': { name: 'Vedder Mountain Vet Clinic', location: 'Chilliwack' },
    'XN': { name: 'Skeena Animal Hospital', location: 'Terrace' },
    'XP': { name: 'Little Mountain Vet Clinic', location: 'Chilliwack' },
    'XR': { name: 'Cats at Home Feline Hsecall Practice', location: 'Surrey' },
    'XS': { name: 'North Road Animal Hospital', location: 'Coquitlam' },
    'XT': { name: 'Country Meadows Pet Hosp', location: 'Maple Ridge' },
    'XV': { name: 'Atlas Animal Hospital', location: 'Vancouver' },
    'XW': { name: 'All About Cats Veterinary Clinic', location: 'North Van' },
    'XX': { name: 'Angel Animal Hospital', location: 'Surrey' },
    'XY': { name: 'Apex Animal Hospital', location: 'Langley' },
    'XZ': { name: 'Atlas Animal Hospital', location: 'Sechelt', closed: true },
    'YA': { name: 'Pals With Paws Vet Hospital', location: 'Salmon Arm' },
    'YB': { name: 'Carrington Animal Hospital', location: 'Westbank' },
    'YC': { name: 'Animal Emerg Clinic of Fraser Vlly', location: 'Langley' },
    'YD': { name: 'South Peace Animal Hospital', location: 'Dawson Creek', closed: true, note: 'Closed 12/21/18, for records email southpeaceanimalhospital@hotmail.com' },
    'YE': { name: 'Catcare Veterinary Clinic', location: 'Richmond' },
    'YF': { name: 'The Animal Clinic on Cornwall', location: 'BC', closed: true },
    'YG': { name: 'Pemberton Veterinary Hospital', location: 'Pemberton', closed: true },
    'YH': { name: 'Shaughnessy Vet Hospital', location: 'Port Coquitlam' },
    'YJ': { name: 'Columbia Summit Vet Hospital', location: 'Kamloops' },
    'YK': { name: 'Murrayville Veterinary Clinic', location: 'Langley', closed: true },
    'YL': { name: 'Eastridge Animal Hospital', location: 'Maple Ridge' },
    'YM': { name: 'Princeton Animal Clinic', location: 'Princeton', closed: true },
    'YN': { name: 'Kermodei Veterinary Hospital', location: 'Terrace' },
    'YP': { name: 'Allwest Animal Hospital', location: 'Abbotsford' },
    'YR': { name: 'Alpine Animal Hospital', location: 'New Westminster' },
    'YS': { name: 'Bowen Vet Services', location: 'Bowen Island', note: 'Reopened - was temporarily closed 06/30/18' },
    'YT': { name: 'Port Moody Animal Hospital', location: 'Port Moody' },
    'YV': { name: 'Wilson Veterinary Housecall', location: 'North Vancouver', closed: true },
    'YW': { name: 'Healing Place Veterinary Clinic', location: 'North Van', closed: true },
    'YX': { name: 'The Animal Clinic on Burrard', location: 'Vancouver', closed: true },
    'YY': { name: 'Stevens Veterinary Services', location: 'Horsefly Lake', closed: true },
    'YZ': { name: 'Powell River Veterinary Hospital', location: 'Powell River' },
    'AAA': { name: 'Vetcetera Pet Hospital-Park Royal', location: 'BC', closed: true, note: 'New name/code = West Vancouver Veterinary Hospital - ACT' },
    'AAB': { name: 'Crescent Falls Veterinary Hospital', location: 'Vernon' },
    'AAC': { name: 'Hastings Veterinary Hospital', location: 'Burnaby' },
    'AAD': { name: 'Tender Care Vet Hospital', location: 'Surrey', closed: true },
    'AAE': { name: 'Westgate Animal Hospital', location: 'Maple Ridge' },
    'AAF': { name: 'Vancouver Feline Hospital', location: 'Vancouver' },
    'AAG': { name: 'Second Chance Animal Shelter', location: 'Nelson' },
    'AAH': { name: 'Yaletown Pet Hospital', location: 'Vancouver' },
    'AAJ': { name: 'Delbrook Mall Animal Hospital', location: 'North Van' },
    'AAK': { name: 'K.L.O. Veterinary Hospital', location: 'Kelowna' },
    'AAM': { name: 'Oak Bay Pet Clinic', location: 'Victoria' },
    'AAN': { name: 'Haney Animal Hospital', location: 'Maple Ridge' },
    'AAP': { name: 'Cloverdale Animal Hospital', location: 'Cloverdale' },
    'AAR': { name: 'Lifeline Animal Clinic', location: 'Victoria' },
    'AAS': { name: 'Paws & Claws Animal Hospital', location: 'Langley' },
    'AAT': { name: 'Madeira Park Veterinary Clinic', location: 'Mad. Park' },
    'AAV': { name: 'Sunshine Coast Pet Hosp & Mobile Service', location: 'Gibson’s Landing' },
    'AAW': { name: 'Rivers Animal Hospital', location: 'Fort St. John' },
    'AAX': { name: 'Lougheed Animal Hospital', location: 'Mission' },
    'AAY': { name: 'Menzies Pet Hospital', location: 'Chilliwack' },
    'ABA': { name: 'Atlantic Animal Hospital', location: 'Surrey' },
    'ABB': { name: 'South Point Pet Hospital', location: 'Surrey' },
    'ABC': { name: 'Whatcom Road Veterinary Hosp', location: 'Abbotsford', closed: true },
    'ABD': { name: 'Panorama Village Animal Hospital', location: 'Surrey' },
    'ABE': { name: 'Lincoln Animal Hospital', location: 'Coquitlam' },
    'ABF': { name: 'Central Cowichan Animal Hosp', location: 'Cowichan' },
    'ABG': { name: 'BCSPCA Prince George Spay/Neuter Clinic', location: 'BC' },
    'ABH': { name: 'Cottonwood Veterinary Clinic', location: 'Chilliwack' },
    'ABI': { name: 'Family Pet Hospital', location: 'Chilliwack' },
    'ABJ': { name: 'Alpine Pet Hospital', location: 'Kelowna' },
    'ABK': { name: 'VetCare Mobile Animal Clinic & Surgery', location: 'Salmon Arm', closed: true },
    'ABL': { name: 'Rose Valley Veterinary Hospital', location: 'Kelowna' },
    'ABM': { name: 'North Delta Hospital', location: 'Delta', note: 'Former name: Delta Animal Hospital' },
    'ABN': { name: 'Pacific Rim Veterinary Hosp', location: 'Port Alberni' },
    'ABO': { name: 'Willowbrook Animal Hospital', location: 'Langley' },
    'ABP': { name: 'Canada West Veterinary Specialists', location: 'Van' },
    'ABR': { name: 'Sunoka Veterinary Clinic', location: 'Summerland' },
    'ABS': { name: 'Central Ridge Vet Clinic', location: 'Okanagan Falls', closed: true },
    'ABT': { name: 'Sunshine Plaza Animal Hospital', location: 'Vancouver' },
    'ABV': { name: 'South Fraser Animal Hospital', location: 'Abbotsford' },
    'ABW': { name: 'Coombs Veterinary Hospital', location: 'Coombs', note: 'See Norgate Animal Hospital' },
    'ABX': { name: 'Alpenlofts Veterinary Hospital', location: 'Garibaldi Highlands' },
    'ABY': { name: 'City Petcare Hospital', location: 'Surrey' },
    'ABZ': { name: 'Peninsula Crossing Animal Hospital', location: 'Surrey' },
    'ACA': { name: 'The Landing Veterinary Clinic', location: 'Gibsons' },
    'ACB': { name: 'High Point Animal Hospital', location: 'Surrey' },
    'ACC': { name: 'Salmon Arm Mobile Veterinary Clinic', location: 'BC', closed: true },
    'ACD': { name: 'Tricity Animal Hospital', location: 'Port Coquitlam' },
    'ACE': { name: 'Norgate Animal Hospital', location: 'North Van' },
    'ACF': { name: 'Apollo Animal Hospital', location: 'Surrey' },
    'ACG': { name: 'Grand Street Cat Clinic', location: 'Mission', closed: true, note: 'Records with: South Fraser Animal Hospital - ABV' },
    'ACH': { name: 'Thunderbird Animal Hospital', location: 'Langley' },
    'ACI': { name: 'Douglas College', location: 'New West', note: 'AHT Program' },
    'ACJ': { name: 'BC SPCA Kamloops Spay Neuter Clinic', location: 'Kamloops' },
    'ACK': { name: 'Dr. Jim Proctor', location: 'BC', closed: true },
    'ACL': { name: '186 St. Animal Hospital', location: 'BC' },
    'ACM': { name: 'Eagle Rise Animal Hospital', location: 'BC' },
    'ACN': { name: 'Mainland Animal Emergency Clinic', location: 'BC' },
    'ACP': { name: 'West Coast Veterinary Dental Services Inc.', location: 'BC' },
    'ACR': { name: 'Healing Paws Veterinary Care', location: 'BC' },
    'ACS': { name: 'Lions Gate Animal Hospital', location: 'BC', closed: true },
    'ACT': { name: 'West Vancouver Veterinary Hospital', location: 'BC' },
    'ACU': { name: 'Oxford Animal Hospital', location: 'BC' },
    'ACV': { name: 'Central Richmond Pet Hospital', location: 'BC', closed: true },
    'ACW': { name: 'Little Paws Animal Clinic', location: 'BC' },
    'ACX': { name: 'Pemberton Veterinary Hospital', location: 'BC' },
    'ACY': { name: 'Hope Veterinary Services', location: 'BC' },
    'ACZ': { name: 'Meadowvale Animal Hospital', location: 'BC' },
    'ADA': { name: 'Otter Point Veterinary Hospital', location: 'BC' },
    'ADB': { name: 'Revelstoke Veterinary Clinic', location: 'BC' },
    'ADC': { name: 'Edmonds St. Animal Hospital', location: 'BC' },
    'ADD': { name: 'Chase River Animal Hospital', location: 'BC' },
    'ADE': { name: 'Fraser Village Pet Hospital', location: 'BC', closed: true },
    'ADF': { name: 'Townline Veterinary Hospital', location: 'BC' },
    'ADG': { name: 'Tranquille Road Animal Hospital', location: 'BC' },
    'AEA': { name: 'Main Street Animal Hospital', location: 'BC' },
    'AEB': { name: 'Pacific Animal Hospital (Closed as of June 11', location: '2019. For medical records, contact 604-585-1177', closed: true },
    'AEC': { name: 'Capital Cat Clinic', location: 'BC' },
    'AEE': { name: 'Head to Tail Veterinary Hospital', location: 'BC' },
    'AEF': { name: 'Deep Creek Veterinary Services', location: 'BC' },
    'AEH': { name: 'Columbia Square Animal Hospital', location: 'BC' },
    'AEJ': { name: 'Downtown Veterinary Clinic', location: 'BC' },
    'AEK': { name: 'Murrayville Animal Hospital', location: 'BC' },
    'AEL': { name: 'Gibsons Animal Hospital', location: 'BC' },
    'AEM': { name: 'Hemlock Animal Hospital', location: 'BC' },
    'AEN': { name: 'Burnside Pet Clinic', location: 'BC' },
    'AEP': { name: 'Alpha Animal Hospital', location: 'BC' },
    'AEQ': { name: 'Central Island Veterinary Emergency Hospital Ltd.', location: 'BC' },
    'AER': { name: 'College Heights Veterinary Clinic', location: 'BC' },
    'AES': { name: 'Peace Arch Veterinary Hospital White Rock', location: 'BC' },
    'AET': { name: 'Burtch Pet Clinic', location: 'BC' },
    'AEU': { name: 'Mountain View Veterinary Hospital Ltd. 1st AEW Ave Animal Hospital', location: 'BC' },
    'AEV': { name: 'Twin Rivers Animal Hospital', location: 'BC', note: 'If AEV, contact both Twin Rivers & The Country AH' },
    'AEX': { name: 'Healing Choices Veterinary Clinic Ltd.', location: 'BC', closed: true },
    'AEY': { name: 'Kitimat Animal Hospital', location: 'BC' },
    'AEZ': { name: 'Asher Road Animal Hospital', location: 'BC' },
    'AFA': { name: 'Dawson Street Veterinary Clinic', location: 'Burnaby' },
    'AFB': { name: 'Willoughby Animal Hospital Inc.', location: 'BC' },
    'AFC': { name: 'Queen’s Park Pet Hospital Ltd.', location: 'BC' },
    'AFE': { name: 'Burkeview Animal Hospital Ltd', location: 'BC' },
    'AFF': { name: 'Terrace Animal Hospital', location: 'BC' },
    'AFG': { name: 'Eagleview Veterinary Hospital', location: 'BC' },
    'AFH': { name: 'Hart Family Veterinary Clinic Ltd.', location: 'BC' },
    'AFJ': { name: 'BC Animal Hospital', location: 'BC' },
    'AFK': { name: 'Animal Health Clinic of Whistler', location: 'BC' },
    'AFL': { name: 'Central Park Animal Hospital', location: 'BC' },
    'AFM': { name: 'Pandosy Village Veterinary Hospital Ltd.', location: 'BC' },
    'AFN': { name: 'Grace Veterinary Hospital Ltd.', location: 'BC' },
    'AFP': { name: 'Aberdeen Veterinary Hospital', location: 'BC' },
    'AFR': { name: 'Greystone Animal Hospital', location: 'BC' },
    'AFS': { name: 'Yorkson Creek Veterinary Hospital Ltd.', location: 'BC' },
    'AFT': { name: 'Gentle Pet Clinic', location: 'Fort St John' },
    'AFV': { name: 'Harbourview Animal Hospital .', location: 'BC', closed: true, note: 'Closed as of December 2 2019. Records held at Delbrook Mall Animal Hospital' },
    'AFW': { name: 'Small Blessing Veterinary Services Ltd.', location: 'BC' },
    'AFX': { name: 'The Cat Hospital of Kamloops', location: 'BC' },
    'AFY': { name: 'Coastal Rivers Pet Hospital', location: 'BC' },
    'AFZ': { name: 'Newport Village Animal Hospital', location: 'BC' },
    'AGA': { name: 'Gladys Pet Hospital', location: 'Abbotsford' },
    'AGB': { name: 'All Creatures Animal Hospital', location: 'BC' },
    'AGC': { name: 'Meadowbrook Cat Clinic', location: 'BC' },
    'AGE': { name: 'Harbour City Animal Hospital', location: 'BC' },
    'AGF': { name: 'Vic West Pet Hospital', location: 'BC' },
    'AGG': { name: 'Maillardville Animal Hospital', location: 'BC' },
    'AGH': { name: 'Millstream Veterinary Hospital', location: 'BC' },
    'AGJ': { name: 'Eagle Hill Animal Hospital', location: 'BC' },
    'AGK': { name: 'Tanglefoot Veterinary Services Ltd. Fernie', location: 'BC' },
    'AGL': { name: 'Gibsons Veterinary Hospital', location: 'BC' },
    'AGM': { name: 'RAPS Animal Hospital', location: 'BC' },
    'AGN': { name: 'Vet to Pet Mobile Services Ltd.', location: 'BC' },
    'AGP': { name: 'Oaklands Veterinary Hospital', location: 'BC' },
    'AGR': { name: 'Shawnigan Lake Vet. Wellness Practice', location: 'BC' },
    'AGS': { name: 'Mountainside Animal Hospital & 24 Hour Emergency Services', location: 'BC' },
    'AGT': { name: 'VCA Canada Feltham Animal Hospital', location: 'BC' },
    'AGV': { name: 'Chilliwack Animal Hospital', location: 'BC' },
    'AGW': { name: 'Grandview Animal Hospital', location: 'BC' },
    'AGX': { name: 'VCA Canada Ross Bay Animal Hospital', location: 'BC' },
    'AGY': { name: 'Dr. Tom Sholseth Mobile Veterinary Service', location: 'BC' },
    'AGZ': { name: 'Mahalo Veterinary Hospital', location: 'BC' },
    'AHA': { name: 'Tynehead Animal Hospital', location: 'BC' },
    'AHB': { name: 'South Mission Animal Hospital', location: 'BC' },
    'AHC': { name: 'Uptown Animal Hospital', location: 'BC' },
    'AHE': { name: 'Neighbourhood Veterinary Hospital', location: 'BC' },
    'AHF': { name: 'Spall & Harvey Animal Hospital', location: 'Kelowna' },
    'AHG': { name: 'Fairview Animal Hospital', location: 'Aldergrove' },
    'AHH': { name: 'PoCo West Animal Hospital Birchwood Veterinary Clinic', location: 'Prince George AHK' },
    'AHJ': { name: 'Heritage Animal Hospital', location: 'Parksville' },
    'AHL': { name: 'Stave Lake Veterinary Hospital', location: 'Mission' },
    'AHM': { name: 'Skyline Veterinary Hospital', location: 'BC' },
    'AHN': { name: 'Beach Avenue Animal Hospital', location: 'BC' },
    'AHP': { name: '108 Avenue Animal Hospital', location: 'BC' },
    'AHR': { name: 'Duncan Cat Clinic', location: 'BC' },
    'AHS': { name: 'RainTree Veterinary Hospital', location: 'BC' },
    'AHT': { name: 'Island Tides Veterinary Hospital', location: 'BC' },
    'AHV': { name: 'Fantastic Beasts Veterinary Services', location: 'BC' },
    'AHW': { name: 'McCallum Centre Animal Hospital', location: 'BC' },
    'AHX': { name: 'Silver Star Animal Care Clinic', location: 'BC' },
    'AHY': { name: 'Langley Meadows Animal Hospital', location: 'BC' },
    'AHZ': { name: 'Campbell Heights Animal Hospital', location: 'BC' },
    'AJA': { name: 'Sahali Animal Hospital', location: 'BC' },
    'AJB': { name: 'Mission Pawsible', location: 'BC', note: 'Island Veterinary Hospital, Nanaimo 2008 Elk Lake Veterinary Clinic, Victoria 2008' },
    'AJC': { name: 'Arrowsmith Animal Hospital', location: 'BC', closed: true },
    'AJE': { name: 'Alma Animal Hospital', location: 'Vancouver', note: 'VOKRA partner vet' },
    'NEW': { name: '3-LETTER FACILITY CODES', location: 'BC' },
    'A': { name: 'Bellevue Veterinary Hospital', location: 'Parksville', island: true },
    'B': { name: 'Benson View Vet Hospital', location: 'Nanaimo', island: true },
    'C': { name: 'Departure Bay Vet Hospital', location: 'Nanaimo', island: true },
    'D': { name: 'Island Veterinary Hospital-Central', location: 'Nanaimo', island: true },
    'E': { name: 'Ladysmith Animal Hospital', location: 'Ladysmith', island: true },
    'G': { name: 'Nanaimo Veterinary Hospital', location: 'Nanaimo', island: true },
    'H': { name: 'Parksville Animal Hospital', location: 'Parksville', island: true },
    'J': { name: 'Veterinary Housecall Service', location: 'Parksville', closed: true, island: true },
    'K': { name: 'Prevost Veterinary Clinic', location: 'Duncan', island: true },
    'L': { name: 'Gulf Islands Vet Clinic', location: 'Salt Spring Island', island: true },
    'M': { name: 'Manzini Animal Hospital', location: 'Port Alberni', island: true },
    'N': { name: 'Comox Valley Animal Hospital', location: 'Courtenay', island: true },
    'O': { name: 'Alberni Veterinary Clinic', location: 'Port Alberni', island: true },
    'P': { name: 'Campbell River Vet Hosp', location: 'Campbell River', island: true },
    'R': { name: 'Brentwood Bay Vet Clinic', location: 'BC', island: true },
    'RA': { name: 'Dr. R.F. Abernathy', location: 'Duncan', closed: true, island: true },
    'RB': { name: 'Belmont-Langford Vet Hosp', location: 'Victoria', island: true },
    'RC': { name: 'Central Victoria Vet Hosp', location: 'Victoria', island: true },
    'RD': { name: 'Dogwood Vet Hospital', location: 'Campbell River', island: true },
    'RE': { name: 'Elk Lake Veterinary Clinic', location: 'Victoria', island: true },
    'RJ': { name: 'Juan de Fuca Veterinary Clinic', location: 'Victoria', island: true },
    'RL': { name: 'Lakehill Pet Clinic', location: 'Victoria', closed: true, note: 'Closed 12/07/18, records with: VCA Canada Feltham Animal Hospital - AGT', island: true },
    'RM': { name: 'Pacific Mobile Veterinary Clinic', location: 'Victoria', island: true },
    'RN': { name: 'North Douglas Vet Clinic', location: 'Victoria', closed: true, island: true },
    'RR': { name: 'Napier Lane Animal Clinic', location: 'Victoria', closed: true, island: true },
    'RS': { name: 'Gorge-Esquimalt Vet Clinic', location: 'Victoria', closed: true, island: true },
    'RV': { name: 'Victoria Veterinary Clinic', location: 'Victoria', island: true },
    'RW': { name: 'Qualicum Animal Hosp', location: 'Qualicum Bch', island: true },
    'RY': { name: 'Puntledge Veterinary Clinic', location: 'Courtenay', island: true },
    'S': { name: 'Courtenay Veterinary Clinic', location: 'Courtenay', island: true },
    'SB': { name: 'Quadra Animal Hospital', location: 'Victoria', closed: true, island: true },
    'SC': { name: 'Central Saanich Animal Hospital', location: 'Saanich', island: true },
    'SD': { name: 'Sidney Veterinary Services', location: 'Sidney', closed: true, island: true },
    'SE': { name: 'Twin Cedars Vet Services', location: 'Garbiola Isld', island: true },
    'SF': { name: 'Hillside Veterinary Hospital', location: 'Victoria', island: true },
    'SG': { name: 'Heritage Cat Clinic', location: 'Victoria', closed: true, note: 'Closed 03/31/19, records with: VCA Canada Ross Bay Animal Hospital – AGX', island: true },
    'SH': { name: 'Shelbourne Pet Clinic', location: 'Victoria', closed: true, note: 'Closed 12/07/18, records with: VCA Canada Feltham Animal Hospital - AGT', island: true },
    'SK': { name: 'Sooke Veterinary Hospital', location: 'Sooke', island: true },
    'SL': { name: 'Colwood Veterinary Hospital', location: 'Victoria', closed: true, island: true },
    'SM': { name: 'Glenview Animal Hospital Ltd.', location: 'Victoria', island: true },
    'SP': { name: 'North Island Vet Hospital', location: 'Port Hardy', island: true },
    'SR': { name: 'Garry Oak Veterinary Hospital', location: 'Sidney', island: true },
    'SS': { name: 'Sidney Animal Hospital', location: 'Sidney', island: true },
    'ST': { name: 'Hollywood Pet Hospital', location: 'Saanichton', closed: true, note: 'Closing 04/30/19, records with: VCA Canada Ross Bay Animal Hospital – AGX', island: true },
    'SV': { name: 'Breadner Vet Services', location: 'Saanichton', island: true },
    'SW': { name: 'Feltham Gordon-Head Pet Clinic', location: 'Victoria', closed: true, note: 'Closed 11/30/18, records with: VCA Canada Feltham Animal Hospital - AGT', island: true },
    'SX': { name: 'Cowichan Veterinary Services', location: 'BC', closed: true, island: true },
    'SY': { name: 'Fairfield Pet Clinic', location: 'Victoria', closed: true, note: 'Closed 03/21/19, records with: VCA Canada Ross Bay Animal Hospital – AGX', island: true },
    'TA': { name: 'Duncan Animal Hospital', location: 'Duncan', island: true },
    'TB': { name: 'McKenzie Veterinary Services', location: 'Victoria', island: true },
    'TC': { name: 'Pacific Cat Clinic', location: 'Victoria', island: true },
    'TD': { name: 'Dean Park Pet Hospital', location: 'Sidney', island: true },
    'TE': { name: 'Royal Oak Pet Clinic', location: 'Victoria', island: true },
    'TF': { name: 'Bute Street Veterinary Clinic', location: 'Port Alberni', island: true },
    'TG': { name: 'Gold River-Tahsis Veterinary Clinic', location: 'BC', closed: true, island: true },
    'TH': { name: 'Glanford Animal Hospital', location: 'Victoria', closed: true, note: 'Closed 07/31/18, records with: Thetis Heights Veterinary Clinic', island: true },
    'TJ': { name: 'Cobble Hill Animal Hospital Ltd. Mill Bay', location: 'BC', island: true },
    'TK': { name: 'Greenwood Animal Hosp', location: 'Campbell River', island: true },
    'TL': { name: 'Saltspring Vet Services', location: 'Salt Spring Isle', island: true },
    'TM': { name: 'Colwood Cat Clinic', location: 'Victoria', closed: true, island: true },
    'TN': { name: 'Saseenos Vet Services Ltd.', location: 'Sooke', island: true },
    'TP': { name: 'Beacon Cat Hospital', location: 'Saanichton', island: true },
    'TR': { name: 'Anicare Veterinary Hospital Saanichton', location: 'BC', island: true },
    'TS': { name: 'Applecross Veterinary Hospital', location: 'Nanaimo', island: true },
    'TT': { name: 'Woodgrove Animal Hospital', location: 'Nanaimo', island: true },
    'TV': { name: 'Cumberland Veterinary Clinic', location: 'BC', island: true },
    'TW': { name: 'Beachview Veterinary Hosp', location: 'Qualicum', closed: true, island: true },
    'TX': { name: 'Broadmead Village Veterinary Clinic', location: 'BC', island: true },
    'TY': { name: 'Petroglyph Animal Hospital', location: 'Nanaimo', island: true },
    'VA': { name: 'Tsolum Mobile Vet Health', location: 'Courtenay', island: true },
    'VB': { name: 'The Clinic for Cats', location: 'Nanaimo', island: true },
    'VC': { name: 'North Island Animal Hospital / Port McNeil Veterinary', location: 'Port McNeil', island: true },
    'VE': { name: 'Comox Cat Clinic', location: 'Comox', closed: true, island: true },
    'VF': { name: 'Lakeside Pet Hospital', location: 'Lake Cowichan', closed: true, island: true },
    'VG': { name: 'Shamrock Veterinary Clinic', location: 'Comox', island: true },
    'VH': { name: 'City Pet Animal Clinic', location: 'Victoria', island: true },
    'VJ': { name: 'Sunrise Vet Clinic Inc.', location: 'BC', island: true },
    'VK': { name: 'Chemainus Animal Hospital', location: 'Chemainus', island: true },
    'VL': { name: 'Eden Cat Vet Clinic', location: 'Campbell River', closed: true, island: true },
    'VM': { name: 'Admirals Walk Pet Clinic', location: 'Victoria', island: true },
    'VN': { name: 'Coastland Vet Hosp', location: 'Campbell River', island: true },
    'VP': { name: 'Vetcetera Pet Hospital-Tillimum', location: 'Victoria', island: true },
    'VR': { name: 'Van Isle Veterinary Hospital', location: 'Courtenay', island: true },
    'VT': { name: 'Kindred Spirits Vet Hospital', location: 'Victoria', closed: true, island: true },
    'VZ': { name: 'Oceanside Animal Hospital', location: 'BC', island: true },
    'W': { name: 'Mill Bay Veterinary Hospital', location: 'Mill Bay', island: true },
    'WA': { name: 'Merecroft Vet Clinic', location: 'Campbell River', island: true },
    'WB': { name: 'Lighthouse Veterinary Hosp', location: 'Qualicum', island: true },
    'WC': { name: 'Mid-Isle Veterinary Hospital', location: 'Qualicum', island: true },
    'X': { name: 'Christmas Hill Animal Clinic', location: 'Victoria', closed: true, island: true },
  };

  

  // ============================================
  // TATTOO CODE PARSING
  // ============================================

  /**
   * Parse a tattoo code and return structured information
   * @param {string} code - The tattoo code to parse
   * @returns {Object} Parsed result with facility, year, animalId, or error
   */
  function parseTattooCode(code) {
    if (!code || typeof code !== 'string') {
      return { error: 'Please enter a tattoo code' };
    }

    // Clean and normalize input
    const cleaned = code.trim().toUpperCase().replace(/\s+/g, '');
    
    if (cleaned.length < 3) {
      return { error: 'Tattoo code too short' };
    }

    // Detect format based on starting character
    const startsWithNumbers = /^\d/.test(cleaned);

    let animalId, facilityCode, yearCode;

    if (startsWithNumbers) {
      // Format A: numbers + facility(2-3 letters) + year(1 letter)
      // Examples: 131MKP, 45AAH
      const match = cleaned.match(/^(\d+)([A-Z]{2,3})([A-Z])$/);
      if (!match) {
        return { error: 'Invalid format. Example: 131MKP' };
      }
      animalId = match[1];
      facilityCode = match[2];
      yearCode = match[3];
    } else {
      // Starts with letters - try multiple formats
      let match;
      
      // Format B: facility(2-3 letters) + year(1 letter) + numbers
      // Examples: MKP131, AAHN45
      match = cleaned.match(/^([A-Z]{2,3})([A-Z])(\d+)$/);
      if (match) {
        facilityCode = match[1];
        yearCode = match[2];
        animalId = match[3];
      } else {
        // Format C (Vancouver Island): facility(1-2 letters) + numbers + year(1 letter)
        // Examples: D123V, RE456H
        match = cleaned.match(/^([A-Z]{1,2})(\d+)([A-Z])$/);
        if (match) {
          facilityCode = match[1];
          animalId = match[2];
          yearCode = match[3];
        } else {
          return { error: 'Invalid format. Examples: 131MKP, MKP131, or D123V' };
        }
      }
    }

    // Validate year code
    if (!YEAR_CODES[yearCode]) {
      return { error: `Invalid year code "${yearCode}". Valid codes: A-H, J-N, P-Z (letters D, I, O, Q, U are excluded)` };
    }

    // Look up facility
    const facility = FACILITY_CODES[facilityCode];
    if (!facility) {
      return { 
        error: `Facility code "${facilityCode}" not found in database`,
        facilityCode,
        yearCode,
        animalId,
        possibleYears: YEAR_CODES[yearCode]
      };
    }

    // Build result
    const years = YEAR_CODES[yearCode];
    const yearText = years.length > 1 ? years.join(' or ') : years[0].toString();

    return {
      success: true,
      original: code,
      cleaned: cleaned,
      animalId: animalId,
      facilityCode: facilityCode,
      yearCode: yearCode,
      facility: {
        name: facility.name,
        location: facility.location,
        closed: facility.closed || false,
        note: facility.note || null,
        island: facility.island || false
      },
      possibleYears: years,
      yearText: yearText,
      format: startsWithNumbers ? 'BC Mainland' : 'Vancouver Island'
    };
  }

  /**
   * Generate a Google Maps search URL for a facility
   * @param {string} facilityName - Name of the facility
   * @param {string} location - Location/city of the facility
   * @returns {string} Google Maps search URL
   */
  function getGoogleMapsUrl(facilityName, location) {
    const query = encodeURIComponent(`${facilityName} ${location} BC`);
    return `https://www.google.com/maps/search/${query}`;
  }

  // ============================================
  // POPOVER UI STATE
  // ============================================
  
  let currentPopoverCatIndex = null;
  let popoverElement = null;

  /**
   * Show the tattoo lookup popover for a specific cat
   * @param {number} catIndex - The index of the cat form
   * @param {Object} result - The parsed tattoo code result
   */
  function showTattooPopover(catIndex, result) {
    currentPopoverCatIndex = catIndex;
    
    // Create popover if it doesn't exist
    if (!popoverElement) {
      popoverElement = document.createElement('div');
      popoverElement.id = 'tattooLookupPopover';
      popoverElement.className = 'tattoo-lookup-popover';
      document.body.appendChild(popoverElement);
    }

    // Generate popover content
    let content = '';
    
    if (result.error) {
      content = `
        <div class="tattoo-popover-header">
          <span class="facility-icon">⚠️</span>
          <div class="header-content">
            <p class="facility-name">Lookup Issue</p>
          </div>
          <button class="close-btn" onclick="TattooLookup.hidePopover()">×</button>
        </div>
        <div class="tattoo-popover-error">
          <p class="error-message">${result.error}</p>
          ${result.facilityCode ? `<p class="error-code">Code: ${result.facilityCode}${result.yearCode ? ` / Year: ${result.yearCode}` : ''}</p>` : ''}
        </div>
      `;
    } else {
      const closedBadge = result.facility.closed 
        ? ' <span class="tattoo-badge tattoo-badge-closed">Closed</span>' 
        : '';
      const islandBadge = result.facility.island 
        ? ' <span class="tattoo-badge tattoo-badge-island">Island</span>' 
        : '';
      
      content = `
        <div class="tattoo-popover-header">
          <span class="facility-icon">🏥</span>
          <div class="header-content">
            <p class="facility-name">${result.facility.name}${closedBadge}${islandBadge}</p>
            <p class="facility-location">📍 ${result.facility.location}</p>
          </div>
          <button class="close-btn" onclick="TattooLookup.hidePopover()">×</button>
        </div>
        <div class="tattoo-popover-body">
          <div class="detail-row">
            <span class="detail-label">Animal ID</span>
            <span class="detail-value">${result.animalId}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Facility Code</span>
            <span class="detail-value purple">${result.facilityCode}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Year</span>
            <span class="detail-value purple">${result.yearText}</span>
          </div>
          ${result.facility.closed && result.facility.note ? `
            <div class="tattoo-popover-note">
              ⚠️ ${result.facility.note}
            </div>
          ` : ''}
        </div>
        <div class="tattoo-popover-actions">
          <button class="tattoo-action-btn tattoo-action-btn-primary" onclick="TattooLookup.autofillHospitalName(${catIndex}, '${result.facility.name.replace(/'/g, "\\'")}')">
            Autofill Hospital Name
          </button>
          <button class="tattoo-action-btn tattoo-action-btn-secondary" onclick="TattooLookup.searchGoogleMaps('${result.facility.name.replace(/'/g, "\\'")}', '${result.facility.location}')">
            Search Maps →
          </button>
        </div>
      `;
    }

    popoverElement.innerHTML = content;
    popoverElement.classList.add('show');

    // Position the popover near the tattoo input
    const tattooInput = document.getElementById(`tattooNumber-${catIndex}`);
    if (tattooInput) {
      const rect = tattooInput.getBoundingClientRect();
      const popoverRect = popoverElement.getBoundingClientRect();
      
      // Position to the right of the input if there's space, otherwise below
      let left = rect.right + 10;
      let top = rect.top;
      
      // Check if popover would go off-screen to the right
      if (left + 320 > window.innerWidth) {
        left = rect.left;
        top = rect.bottom + 10;
      }
      
      // Ensure popover doesn't go off-screen at the bottom
      if (top + popoverRect.height > window.innerHeight) {
        top = window.innerHeight - popoverRect.height - 20;
      }
      
      popoverElement.style.left = `${left}px`;
      popoverElement.style.top = `${top + window.scrollY}px`;
    }
  }

  /**
   * Hide the tattoo lookup popover
   */
  function hidePopover() {
    if (popoverElement) {
      popoverElement.classList.remove('show');
    }
    currentPopoverCatIndex = null;
  }

  /**
   * Autofill the hospital name field
   * @param {number} catIndex - The cat form index
   * @param {string} hospitalName - The hospital name to fill
   */
  function autofillHospitalName(catIndex, hospitalName) {
    const hospitalInput = document.getElementById(`hospitalName-${catIndex}`);
    if (hospitalInput) {
      hospitalInput.value = hospitalName;
      hospitalInput.dispatchEvent(new Event('input', { bubbles: true }));
      hospitalInput.dispatchEvent(new Event('change', { bubbles: true }));
      
      // Show success feedback
      if (typeof showToast === 'function') {
        showToast(`✓ Hospital name filled: ${hospitalName}`, 'add');
      }
      
      // Check for VOKRA warning
      if (typeof checkVokraHospitalName === 'function') {
        checkVokraHospitalName(catIndex);
      }
    }
    hidePopover();
  }

  /**
   * Open Google Maps to search for the facility
   * @param {string} facilityName - Name of the facility
   * @param {string} location - Location/city
   */
  function searchGoogleMaps(facilityName, location) {
    const url = getGoogleMapsUrl(facilityName, location);
    window.open(url, '_blank');
  }

  /**
   * Handle tattoo number input change - auto-lookup
   * @param {number} catIndex - The cat form index
   */
  function handleTattooInput(catIndex) {
    const tattooInput = document.getElementById(`tattooNumber-${catIndex}`);
    if (!tattooInput) return;

    const value = tattooInput.value.trim();
    
    // Only trigger lookup if we have at least 3 characters
    if (value.length >= 3) {
      const result = parseTattooCode(value);
      showTattooPopover(catIndex, result);
    } else {
      hidePopover();
    }
  }

  /**
   * Initialize event listeners for a cat form
   * @param {number} catIndex - The cat form index
   */
  function initCatForm(catIndex) {
    const tattooInput = document.getElementById(`tattooNumber-${catIndex}`);
    if (tattooInput && !tattooInput.dataset.tattooLookupInit) {
      tattooInput.dataset.tattooLookupInit = 'true';
      
      // Debounce the input handler
      let debounceTimer;
      tattooInput.addEventListener('input', function() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => handleTattooInput(catIndex), 300);
      });
      
      // Also trigger on focus if there's a value
      tattooInput.addEventListener('focus', function() {
        if (this.value.trim().length >= 3) {
          handleTattooInput(catIndex);
        }
      });
    }
  }

  /**
   * Initialize all existing cat forms and set up observer for new ones
   */
  function init() {
    console.log('🏥 Tattoo Lookup Module initialized');
    
    // Initialize existing cat forms
    const catContainer = document.getElementById('catsContainer');
    if (catContainer) {
      const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          mutation.addedNodes.forEach(function(node) {
            if (node.nodeType === 1) {
              // Check if this is a cat section
              const match = node.id && node.id.match(/^cat-(\d+)$/);
              if (match) {
                setTimeout(() => initCatForm(parseInt(match[1])), 100);
              }
              // Also check child elements
              const tattooInputs = node.querySelectorAll('[id^="tattooNumber-"]');
              tattooInputs.forEach(input => {
                const idx = parseInt(input.id.replace('tattooNumber-', ''));
                if (!isNaN(idx)) {
                  setTimeout(() => initCatForm(idx), 100);
                }
              });
            }
          });
        });
      });

      observer.observe(catContainer, { childList: true, subtree: true });
    }

    // Initialize any existing tattoo inputs
    document.querySelectorAll('[id^="tattooNumber-"]').forEach(input => {
      const idx = parseInt(input.id.replace('tattooNumber-', ''));
      if (!isNaN(idx)) {
        initCatForm(idx);
      }
    });

    // Close popover when clicking outside
    document.addEventListener('click', function(e) {
      if (popoverElement && popoverElement.classList.contains('show')) {
        // Check if click is outside the popover and not on a tattoo input
        if (!popoverElement.contains(e.target) && !e.target.id?.startsWith('tattooNumber-')) {
          hidePopover();
        }
      }
    });

    // Close popover on escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        hidePopover();
      }
    });
  }

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // ============================================
  // EXPORT PUBLIC API
  // ============================================
  
  window.TattooLookup = {
    parse: parseTattooCode,
    getGoogleMapsUrl: getGoogleMapsUrl,
    showPopover: showTattooPopover,
    hidePopover: hidePopover,
    autofillHospitalName: autofillHospitalName,
    searchGoogleMaps: searchGoogleMaps,
    handleTattooInput: handleTattooInput,
    initCatForm: initCatForm,
    init: init,
    YEAR_CODES: YEAR_CODES,
    FACILITY_CODES: FACILITY_CODES
  };

})(window);
