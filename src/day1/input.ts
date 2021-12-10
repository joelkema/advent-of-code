const input = [
    190, 168, 166, 163, 170, 160, 171, 166, 161, 167, 175, 178, 193, 189, 188, 191, 193, 192, 193,
    180, 177, 178, 176, 177, 196, 203, 211, 209, 210, 209, 225, 219, 229, 214, 202, 205, 208, 207,
    208, 204, 208, 206, 205, 208, 209, 219, 236, 241, 243, 239, 251, 278, 279, 284, 283, 287, 244,
    245, 257, 253, 272, 276, 287, 288, 304, 306, 313, 312, 284, 293, 288, 289, 290, 283, 298, 309,
    300, 298, 297, 291, 292, 304, 301, 303, 306, 280, 286, 266, 270, 272, 274, 269, 270, 271, 270,
    266, 274, 275, 278, 280, 283, 284, 283, 267, 282, 283, 285, 286, 302, 307, 309, 311, 309, 315,
    314, 317, 319, 318, 314, 313, 330, 333, 335, 365, 370, 361, 362, 367, 358, 361, 359, 358, 349,
    352, 367, 355, 359, 360, 355, 357, 359, 368, 375, 383, 385, 399, 410, 413, 414, 418, 417, 418,
    419, 420, 421, 422, 434, 439, 438, 440, 441, 443, 445, 444, 446, 450, 452, 463, 466, 476, 464,
    467, 470, 474, 460, 473, 475, 476, 482, 481, 489, 495, 505, 503, 508, 493, 508, 509, 508, 513,
    538, 536, 521, 526, 523, 536, 537, 558, 557, 563, 557, 560, 561, 560, 575, 578, 582, 583, 587,
    574, 576, 581, 580, 579, 581, 599, 601, 602, 606, 607, 606, 605, 606, 607, 611, 607, 606, 605,
    603, 597, 598, 593, 584, 585, 587, 619, 614, 616, 596, 627, 628, 630, 631, 634, 633, 631, 632,
    641, 637, 647, 643, 651, 625, 593, 601, 602, 599, 592, 593, 597, 601, 592, 612, 611, 612, 616,
    620, 622, 627, 626, 629, 632, 642, 654, 655, 657, 658, 661, 662, 653, 655, 658, 665, 674, 664,
    694, 689, 692, 693, 681, 686, 687, 698, 701, 706, 687, 689, 706, 710, 716, 723, 733, 735, 734,
    733, 727, 729, 744, 750, 736, 739, 745, 743, 742, 743, 741, 739, 742, 748, 755, 752, 762, 768,
    767, 760, 758, 756, 765, 779, 796, 797, 798, 796, 797, 775, 779, 780, 781, 784, 794, 799, 793,
    797, 795, 793, 802, 800, 809, 814, 826, 830, 820, 804, 805, 809, 816, 817, 845, 850, 861, 857,
    858, 863, 868, 873, 880, 891, 865, 876, 890, 925, 927, 926, 932, 941, 942, 943, 942, 943, 942,
    947, 938, 940, 943, 949, 953, 954, 966, 970, 967, 963, 961, 964, 966, 973, 983, 975, 974, 980,
    977, 988, 989, 991, 989, 990, 1000, 1001, 1006, 996, 998, 997, 996, 979, 981, 1014, 1018, 1023,
    996, 995, 1006, 1000, 994, 996, 999, 1001, 999, 1000, 1002, 1001, 1003, 1005, 1006, 1014, 1037,
    1039, 1040, 1066, 1059, 1081, 1085, 1072, 1069, 1070, 1069, 1080, 1079, 1106, 1105, 1118, 1127,
    1150, 1151, 1147, 1133, 1134, 1135, 1136, 1137, 1138, 1140, 1138, 1149, 1150, 1149, 1143, 1136,
    1137, 1140, 1141, 1140, 1141, 1142, 1155, 1182, 1173, 1167, 1163, 1172, 1186, 1180, 1176, 1179,
    1178, 1189, 1201, 1205, 1201, 1200, 1209, 1207, 1218, 1226, 1232, 1234, 1233, 1225, 1228, 1229,
    1219, 1221, 1220, 1199, 1201, 1204, 1212, 1224, 1208, 1209, 1210, 1220, 1219, 1215, 1231, 1240,
    1246, 1249, 1281, 1247, 1251, 1255, 1263, 1260, 1292, 1293, 1305, 1311, 1316, 1319, 1323, 1307,
    1326, 1319, 1316, 1327, 1328, 1333, 1342, 1337, 1338, 1335, 1353, 1368, 1371, 1386, 1382, 1381,
    1378, 1374, 1391, 1396, 1397, 1399, 1388, 1380, 1406, 1396, 1398, 1397, 1401, 1402, 1401, 1369,
    1372, 1373, 1370, 1371, 1362, 1375, 1378, 1389, 1400, 1402, 1404, 1420, 1425, 1429, 1425, 1406,
    1412, 1425, 1421, 1401, 1402, 1399, 1400, 1412, 1387, 1386, 1390, 1392, 1396, 1402, 1404, 1405,
    1406, 1379, 1384, 1419, 1420, 1422, 1427, 1423, 1426, 1421, 1420, 1428, 1424, 1428, 1436, 1432,
    1439, 1444, 1457, 1458, 1460, 1464, 1459, 1460, 1493, 1489, 1510, 1503, 1505, 1506, 1492, 1515,
    1517, 1506, 1488, 1485, 1488, 1471, 1473, 1496, 1499, 1497, 1501, 1475, 1465, 1460, 1458, 1462,
    1467, 1466, 1483, 1471, 1476, 1471, 1493, 1492, 1494, 1503, 1504, 1505, 1506, 1507, 1510, 1492,
    1493, 1500, 1498, 1528, 1533, 1538, 1539, 1575, 1576, 1557, 1555, 1557, 1579, 1589, 1594, 1599,
    1600, 1598, 1609, 1619, 1618, 1617, 1629, 1613, 1619, 1620, 1631, 1627, 1628, 1630, 1631, 1616,
    1631, 1651, 1657, 1658, 1637, 1642, 1641, 1651, 1652, 1647, 1649, 1658, 1649, 1629, 1631, 1632,
    1619, 1617, 1620, 1634, 1632, 1633, 1636, 1634, 1641, 1639, 1642, 1647, 1640, 1609, 1611, 1607,
    1597, 1601, 1606, 1635, 1637, 1647, 1640, 1650, 1654, 1656, 1636, 1626, 1624, 1625, 1615, 1620,
    1621, 1618, 1614, 1615, 1616, 1622, 1623, 1625, 1627, 1626, 1627, 1632, 1644, 1659, 1668, 1671,
    1672, 1673, 1676, 1684, 1709, 1735, 1734, 1731, 1738, 1740, 1748, 1751, 1741, 1740, 1739, 1741,
    1739, 1750, 1762, 1766, 1765, 1764, 1775, 1774, 1775, 1776, 1777, 1778, 1757, 1755, 1756, 1757,
    1756, 1776, 1780, 1781, 1790, 1792, 1791, 1803, 1810, 1801, 1800, 1831, 1834, 1818, 1823, 1806,
    1801, 1812, 1814, 1837, 1842, 1843, 1842, 1841, 1836, 1828, 1835, 1846, 1845, 1855, 1854, 1858,
    1856, 1865, 1866, 1865, 1850, 1859, 1872, 1868, 1866, 1867, 1862, 1869, 1870, 1882, 1896, 1901,
    1903, 1917, 1939, 1942, 1945, 1955, 1956, 1954, 1974, 1944, 1943, 1942, 1956, 1961, 1957, 1953,
    1954, 1955, 1958, 1961, 1948, 1947, 1959, 1960, 1961, 1969, 1996, 1992, 1993, 1988, 1994, 2021,
    2020, 2003, 1999, 1995, 2006, 2002, 1994, 1995, 1998, 1995, 1988, 1992, 1997, 2003, 2006, 2007,
    2010, 2006, 2015, 2000, 1998, 1993, 2003, 2004, 2006, 2005, 2008, 2019, 2020, 2030, 2031, 2036,
    2037, 2038, 2037, 2036, 2038, 2031, 2043, 2044, 2047, 2050, 2049, 2027, 2053, 2057, 2058, 2034,
    2038, 2033, 2034, 2038, 2045, 2031, 2037, 2053, 2061, 2058, 2062, 2063, 2051, 2046, 2045, 2042,
    2043, 2042, 2037, 2053, 2047, 2059, 2058, 2057, 2058, 2069, 2070, 2073, 2086, 2098, 2116, 2110,
    2108, 2109, 2111, 2112, 2114, 2116, 2102, 2108, 2110, 2111, 2115, 2114, 2123, 2124, 2121, 2144,
    2167, 2170, 2167, 2135, 2141, 2145, 2152, 2166, 2159, 2160, 2133, 2132, 2133, 2100, 2104, 2101,
    2102, 2109, 2108, 2109, 2112, 2114, 2113, 2114, 2123, 2121, 2122, 2116, 2115, 2126, 2133, 2135,
    2136, 2137, 2138, 2137, 2140, 2156, 2148, 2144, 2143, 2142, 2145, 2161, 2160, 2162, 2154, 2155,
    2136, 2134, 2132, 2138, 2140, 2143, 2135, 2136, 2143, 2130, 2127, 2158, 2161, 2167, 2169, 2186,
    2191, 2185, 2193, 2192, 2205, 2199, 2198, 2199, 2201, 2200, 2201, 2225, 2234, 2232, 2241, 2230,
    2227, 2218, 2228, 2241, 2242, 2243, 2258, 2251, 2242, 2226, 2218, 2223, 2222, 2225, 2247, 2246,
    2243, 2245, 2238, 2239, 2237, 2255, 2257, 2258, 2251, 2267, 2268, 2269, 2283, 2264, 2266, 2264,
    2265, 2293, 2310, 2327, 2334, 2354, 2353, 2358, 2354, 2359, 2353, 2362, 2363, 2364, 2362, 2366,
    2362, 2356, 2355, 2351, 2385, 2386, 2387, 2389, 2391, 2400, 2411, 2373, 2343, 2332, 2331, 2335,
    2346, 2343, 2357, 2365, 2366, 2373, 2374, 2368, 2363, 2362, 2366, 2365, 2369, 2340, 2341, 2337,
    2357, 2358, 2353, 2355, 2374, 2373, 2379, 2382, 2390, 2388, 2387, 2388, 2387, 2388, 2389, 2399,
    2400, 2398, 2406, 2409, 2414, 2416, 2425, 2434, 2424, 2418, 2420, 2413, 2418, 2419, 2427, 2428,
    2429, 2428, 2431, 2430, 2418, 2430, 2434, 2442, 2443, 2410, 2409, 2416, 2400, 2398, 2402, 2403,
    2405, 2440, 2433, 2439, 2435, 2414, 2431, 2440, 2443, 2442, 2445, 2449, 2448, 2444, 2443, 2450,
    2432, 2431, 2436, 2460, 2467, 2471, 2470, 2473, 2477, 2486, 2487, 2482, 2487, 2488, 2490, 2493,
    2465, 2463, 2471, 2467, 2466, 2473, 2469, 2471, 2483, 2484, 2496, 2494, 2497, 2493, 2521, 2522,
    2500, 2504, 2512, 2521, 2522, 2529, 2524, 2521, 2528, 2529, 2544, 2521, 2532, 2525, 2530, 2524,
    2523, 2505, 2498, 2499, 2494, 2487, 2484, 2487, 2488, 2491, 2498, 2497, 2486, 2478, 2484, 2488,
    2489, 2491, 2489, 2493, 2496, 2499, 2496, 2495, 2498, 2499, 2498, 2497, 2503, 2500, 2534, 2535,
    2546, 2588, 2616, 2642, 2641, 2640, 2654, 2663, 2659, 2663, 2664, 2674, 2678, 2680, 2683, 2692,
    2698, 2703, 2704, 2707, 2704, 2735, 2710, 2728, 2730, 2739, 2734, 2741, 2738, 2760, 2744, 2745,
    2746, 2747, 2750, 2744, 2746, 2759, 2761, 2762, 2763, 2764, 2785, 2795, 2818, 2820, 2824, 2828,
    2831, 2833, 2837, 2838, 2840, 2839, 2847, 2844, 2835, 2834, 2829, 2835, 2837, 2805, 2832, 2833,
    2832, 2833, 2822, 2823, 2826, 2835, 2823, 2825, 2828, 2829, 2828, 2850, 2851, 2853, 2862, 2864,
    2877, 2871, 2874, 2886, 2921, 2895, 2899, 2887, 2898, 2897, 2899, 2922, 2929, 2935, 2937, 2938,
    2935, 2939, 2944, 2945, 2981, 2982, 2986, 3002, 3003, 3010, 3009, 3020, 3021, 3029, 3028, 3019,
    3020, 3021, 2996, 2993, 2999, 3009, 3013, 2996, 2988, 2990, 3032, 3031, 3023, 3037, 3027, 2994,
    2988, 2991, 3023, 3025, 3029, 3033, 3043, 3052, 3053, 3052, 3054, 3055, 3045, 3044, 3053, 3056,
    3077, 3078, 3079, 3073, 3099, 3093, 3097, 3100, 3064, 3076, 3082, 3095, 3091, 3095, 3101, 3102,
    3099, 3100, 3095, 3097, 3093, 3102, 3105, 3143, 3160, 3157, 3156, 3158, 3150, 3151, 3150, 3157,
    3184, 3179, 3181, 3173, 3179, 3184, 3187, 3197, 3198, 3199, 3208, 3214, 3221, 3205, 3209, 3210,
    3214, 3215, 3214, 3216, 3234, 3237, 3246, 3254, 3255, 3278, 3277, 3278, 3281, 3299, 3298, 3306,
    3305, 3304, 3315, 3323, 3330, 3331, 3323, 3326, 3329, 3330, 3336, 3326, 3324, 3320, 3318, 3317,
    3319, 3318, 3320, 3321, 3322, 3331, 3322, 3315, 3326, 3325, 3317, 3316, 3312, 3323, 3322, 3329,
    3328, 3323, 3324, 3332, 3331, 3329, 3294, 3293, 3290, 3283, 3278, 3281, 3290, 3291, 3265, 3268,
    3271, 3255, 3248, 3249, 3250, 3253, 3254, 3276, 3277, 3274, 3279, 3281, 3295, 3290, 3306, 3309,
    3300, 3306, 3317, 3316, 3325, 3322, 3343, 3346, 3355, 3356, 3370, 3371, 3372, 3373, 3377, 3378,
    3390, 3397, 3399, 3433, 3454, 3468, 3474, 3472, 3475, 3473, 3471, 3489, 3490, 3495, 3510, 3505,
    3514, 3516, 3528, 3529, 3545, 3544, 3549, 3547, 3555, 3556, 3555, 3546, 3555, 3556, 3566, 3553,
    3552, 3578, 3565, 3566, 3558, 3544, 3540, 3539, 3534, 3535, 3522, 3523, 3512, 3508, 3548, 3559,
    3566, 3561, 3581, 3584, 3616, 3624, 3623, 3626, 3625, 3624, 3630, 3627, 3631, 3618, 3632, 3631,
    3641, 3648, 3645, 3649, 3653, 3663, 3672, 3677, 3678, 3686, 3688, 3687, 3694, 3684, 3688, 3690,
    3699, 3703, 3706, 3707, 3711, 3718, 3715, 3716, 3717, 3718, 3724, 3723, 3733, 3737, 3738, 3739,
    3738, 3741, 3769, 3770, 3767, 3770, 3769, 3768, 3771, 3743, 3744, 3749, 3752, 3755, 3756, 3755,
    3750, 3751, 3750, 3745, 3755, 3757, 3756, 3758, 3759, 3769, 3768, 3776, 3766, 3774, 3776, 3775,
    3780, 3801, 3776, 3775, 3776, 3789, 3794, 3793, 3790, 3773, 3769, 3770, 3781, 3782, 3781, 3782,
    3755, 3762, 3763, 3768, 3765, 3780, 3789, 3790, 3792, 3795, 3796, 3797, 3796, 3789, 3788, 3791,
    3786, 3785, 3784, 3764, 3767, 3771, 3774, 3782, 3794, 3811, 3802, 3808, 3819, 3806, 3826, 3818,
    3808, 3809, 3824, 3844, 3833, 3834, 3825, 3830, 3835, 3839, 3841, 3828, 3826, 3835, 3841, 3849,
    3858, 3851, 3846, 3850, 3853, 3863, 3862, 3866, 3867, 3873, 3871, 3859, 3892, 3887, 3905, 3914,
    3915, 3909, 3910, 3926, 3925, 3933, 3930, 3933, 3930, 3920, 3919, 3923, 3924, 3920, 3922, 3935,
    3938, 3940, 3935, 3947, 3948, 3952, 3953, 3962, 3985, 3984, 3987, 4005, 4006, 4007, 4027, 4031,
    4043, 4042, 4037, 4038, 4034, 4037, 4044, 4054, 4063, 4081, 4078, 4090, 4114, 4125, 4122, 4130,
    4137, 4142, 4140, 4139, 4140, 4139, 4143, 4158, 4155, 4151, 4154, 4153, 4152, 4148, 4144, 4145,
    4157, 4145, 4143, 4144, 4142, 4143, 4144, 4150, 4152, 4153, 4176, 4165, 4168, 4175, 4178, 4184,
    4183, 4182, 4164, 4163, 4164, 4177, 4192, 4190, 4197, 4216, 4217, 4214, 4192, 4193, 4189, 4191,
    4171, 4172, 4177, 4194, 4189, 4187, 4192, 4198, 4200, 4210, 4222, 4243, 4252, 4253, 4258, 4264,
    4260, 4261, 4259, 4272, 4290, 4318, 4320, 4334, 4335, 4336, 4352, 4356, 4380, 4400, 4396, 4389,
    4390, 4393, 4392, 4397, 4399, 4397, 4395, 4400, 4394, 4403, 4400, 4416, 4417, 4424, 4431, 4437,
    4424, 4422, 4421, 4422, 4410, 4417, 4420, 4421, 4428, 4439, 4449, 4448, 4437, 4414, 4429, 4440,
    4417, 4418, 4422, 4401, 4393, 4402, 4400, 4414, 4419, 4392, 4395, 4406, 4428, 4429, 4442, 4413,
    4437, 4447, 4444, 4430, 4429, 4438, 4434, 4433, 4436, 4422, 4423, 4422, 4413, 4415, 4403, 4416,
    4420, 4386, 4379, 4371, 4378, 4381, 4404, 4417, 4416, 4418, 4412, 4416, 4407, 4400, 4408, 4412,
    4423, 4421, 4412, 4409, 4426, 4424, 4429, 4420, 4398, 4404, 4403, 4409, 4410, 4418, 4417, 4426,
    4428, 4447, 4459, 4461, 4465, 4478, 4479, 4450, 4452, 4454, 4445, 4447, 4459, 4482,
];

export default input;