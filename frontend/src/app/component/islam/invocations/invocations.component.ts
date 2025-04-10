import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-invocations',
  templateUrl: './invocations.component.html',
  styleUrls: ['./invocations.component.css']
})
export class InvocationsComponent implements OnInit {
  categories: any[] = [];
  selectedCategory: string = 'Invocations du quotidien'; // Set default category
  private invocationsData: any = [
    {
      "title": "Invocations du quotidien",
      "invocations": [
        {
          "invocation_arabe": "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ",
          "invocation_transliteration": "Bismillahi ar-Rahmani ar-Rahim",
          "invocation_francais": "Au nom d’Allah, le Tout Miséricordieux, le Très Miséricordieux",
          "raison": "Récitée avant de commencer une action pour obtenir la bénédiction et la protection d'Allah."
        },
        {
          "invocation_arabe": "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
          "invocation_transliteration": "Alhamdu lillahi Rabbi al-'Alamin",
          "invocation_francais": "Louange à Allah, Seigneur de l’univers",
          "raison": "Exprimée pour remercier Allah, souvent utilisée après avoir mangé ou accompli une bonne action."
        },
        {
          "invocation_arabe": "اللّهُ أَكْبَرُ",
          "invocation_transliteration": "Allahu Akbar",
          "invocation_francais": "Allah est le plus Grand",
          "raison": "Récitée pour rappeler la grandeur d'Allah, souvent dans les prières ou en face de moments de difficulté ou d'émerveillement."
        },
        {
          "invocation_arabe": "مَا شَاءَ اللَّهُ",
          "invocation_transliteration": "Masha'Allah",
          "invocation_francais": "Ce que veut Allah",
          "raison": "Récitée pour exprimer la reconnaissance envers les bénédictions d'Allah et éviter le mal de l'envie."
        },
        {
          "invocation_arabe": "اللّهُمَّ صَلِّ عَلَى مُحَمَّدٍ",
          "invocation_transliteration": "Allahumma salli 'ala Muhammad",
          "invocation_francais": "Ô Allah, bénis Muhammad",
          "raison": "Invocation pour envoyer des bénédictions sur le Prophète Muhammad."
        }
      ]
    },
    {
      "title": "Invocations de demande de pardon",
      "invocations": [
        {
          "invocation_arabe": "أَسْتَغْفِرُ اللَّهَ",
          "invocation_transliteration": "Astaghfirullah",
          "invocation_francais": "Je demande pardon à Allah",
          "raison": "Récitée pour demander pardon pour les péchés commis, elle est très recommandée après une prière ou lorsqu'on est conscient d'une faute."
        },
        {
          "invocation_arabe": "اللّهُمَّ اغْفِرْ لِي وَلِوَالِدَيَّ",
          "invocation_transliteration": "Allahumma ighfir li wa li-walidayya",
          "invocation_francais": "Ô Allah, pardonne-moi et à mes parents",
          "raison": "Invocation faite pour demander le pardon pour soi-même et pour les parents, souvent après la prière."
        },
        {
          "invocation_arabe": "رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ",
          "invocation_transliteration": "Rabbi ighfir li wa li-walidayya wa lil-mu'minin",
          "invocation_francais": "Seigneur, pardonne-moi, pardonne à mes parents et aux croyants",
          "raison": "Récitée pour demander pardon à Allah pour soi, ses parents et tous les croyants."
        },
        {
          "invocation_arabe": "رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
          "invocation_transliteration": "Rabbi irhamhuma kama rabbayani saghiran",
          "invocation_francais": "Seigneur, fais miséricorde à mes parents comme ils m’ont élevé quand j’étais petit",
          "raison": "Invocation pour demander miséricorde pour les parents, en se rappelant de leur rôle dans l’éducation."
        },
        {
          "invocation_arabe": "اللّهُمَّ عَفُوٌّ كَرِيمٌ",
          "invocation_transliteration": "Allahumma 'afuwwun karim",
          "invocation_francais": "Ô Allah, pardonneur et généreux",
          "raison": "Invocation pour demander la clémence et le pardon d'Allah."
        }
      ]
    },
    {
      "title": "Invocations de glorification et de reconnaissance",
      "invocations": [
        {
          "invocation_arabe": "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
          "invocation_transliteration": "SubhanAllahi wa bihamdihi",
          "invocation_francais": "Gloire et louange à Allah",
          "raison": "Récitée pour glorifier Allah et exprimer la gratitude. Elle peut être récitée après la prière ou à tout moment pour obtenir des bénédictions."
        },
        {
          "invocation_arabe": "سُبْحَانَ اللَّهِ الْعَظِيمِ",
          "invocation_transliteration": "SubhanAllahi al-'Azim",
          "invocation_francais": "Gloire à Allah le Très Grand",
          "raison": "Récitée pour exprimer la grandeur d'Allah, souvent pendant les moments de prière ou de méditation."
        },
        {
          "invocation_arabe": "الْحَمْدُ لِلَّهِ",
          "invocation_transliteration": "Alhamdu lillahi",
          "invocation_francais": "Louange à Allah",
          "raison": "Exprime la gratitude envers Allah pour toutes les bénédictions."
        },
        {
          "invocation_arabe": "اللّهُمَّ لَكَ الْحَمْدُ",
          "invocation_transliteration": "Allahumma laka al-hamdu",
          "invocation_francais": "Ô Allah, à Toi la louange",
          "raison": "Récitée pour reconnaître que toute louange est due à Allah seul."
        },
        {
          "invocation_arabe": "اللّهُمَّ صَلِّ عَلَى النَّبِيِّ",
          "invocation_transliteration": "Allahumma salli 'ala an-Nabi",
          "invocation_francais": "Ô Allah, bénis le Prophète",
          "raison": "Invocation pour demander des bénédictions pour le Prophète Muhammad."
        }
      ]
    },
    {
      "title": "Invocations de demande de bénédictions",
      "invocations": [
        {
          "invocation_arabe": "اللّهُمَّ بارِكْ لِي فِي عُمُرِي",
          "invocation_transliteration": "Allahumma barik li fi umri",
          "invocation_francais": "Ô Allah, bénis ma vie",
          "raison": "Demandé pour obtenir des bénédictions sur la durée de sa vie."
        },
        {
          "invocation_arabe": "اللّهُمَّ زِدْنِي عِلْمًا",
          "invocation_transliteration": "Allahumma zidni 'ilman",
          "invocation_francais": "Ô Allah, accorde-moi plus de connaissance",
          "raison": "Demandé pour augmenter la connaissance et la sagesse."
        },
        {
          "invocation_arabe": "اللّهُمَّ اجْعَلْنِي مِنَ الصَّابِرِينَ",
          "invocation_transliteration": "Allahumma ajilni min al-sabireen",
          "invocation_francais": "Ô Allah, fais de moi parmi les patients",
          "raison": "Demandé pour obtenir la patience dans les épreuves."
        },
        {
          "invocation_arabe": "اللّهُمَّ ارْزُقْنِي الْعَفْوَ وَالْمَغْفِرَةَ",
          "invocation_transliteration": "Allahumma ruzuqni al-'afwa wa al-maghfirah",
          "invocation_francais": "Ô Allah, accorde-moi pardon et miséricorde",
          "raison": "Demandé pour obtenir le pardon et la miséricorde d'Allah."
        },
        {
          "invocation_arabe": "اللّهُمَّ احْفَظْنِي مِنَ الشَّيَاطِينِ",
          "invocation_transliteration": "Allahumma ahfazni min al-shayatin",
          "invocation_francais": "Ô Allah, protège-moi des démons",
          "raison": "Demandé pour obtenir la protection contre les influences négatives."
        }
      ]
    },
    {
      "title": "Invocations de protection",
      "invocations": [
        {
          "invocation_arabe": "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
          "invocation_transliteration": "A'udhu billahi min ash-shaytan ir-rajim",
          "invocation_francais": "Je cherche refuge auprès d'Allah contre le diable banni",
          "raison": "Récitée pour se protéger contre les tentations et les malices du diable."
        },
        {
          "invocation_arabe": "اللّهُمَّ احْفَظْنِي مِنْ كُلِّ شَرٍّ",
          "invocation_transliteration": "Allahumma ahfazni min kulli shar",
          "invocation_francais": "Ô Allah, protège-moi de tout mal",
          "raison": "Demandé pour obtenir une protection contre tous les maux."
        },
        {
          "invocation_arabe": "اللّهُمَّ اجْعَلْنِي مِنَ الْمُؤْمِنِينَ",
          "invocation_transliteration": "Allahumma ajilni min al-mu'minin",
          "invocation_francais": "Ô Allah, fais de moi parmi les croyants",
          "raison": "Demandé pour renforcer la foi et l'engagement envers Allah."
        },
        {
          "invocation_arabe": "اللّهُمَّ ابْعِدْنِي عَنِ النَّارِ",
          "invocation_transliteration": "Allahumma bu'idni 'an an-nar",
          "invocation_francais": "Ô Allah, éloigne-moi du feu de l'enfer",
          "raison": "Demandé pour se protéger du châtiment éternel."
        },
        {
          "invocation_arabe": "اللّهُمَّ اجْعَلْنِي مِنَ الْمُتَّقِينَ",
          "invocation_transliteration": "Allahumma ajilni min al-muttaqin",
          "invocation_francais": "Ô Allah, fais de moi parmi les pieux",
          "raison": "Demandé pour obtenir la piété et la crainte d'Allah."
        },
        {
          "invocation_arabe": "اللّهُمَّ نَجِّنِي مِنْ بَلَاءِ الدُّنْيَا",
          "invocation_transliteration": "Allahumma najini min bala' al-dunya",
          "invocation_francais": "Ô Allah, sauve-moi des épreuves de ce monde",
          "raison": "Demandé pour obtenir la délivrance des épreuves et difficultés de la vie."
        },
        {
          "invocation_arabe": "اللّهُمَّ قِنِي عَذَابَ الْقَبْرِ",
          "invocation_transliteration": "Allahumma qini 'adhab al-qabr",
          "invocation_francais": "Ô Allah, préserve-moi du châtiment de la tombe",
          "raison": "Demandé pour obtenir la protection contre le châtiment de la tombe."
        },
        {
          "invocation_arabe": "اللّهُمَّ اجْعَلْنِي مِنَ الَّذِينَ يَرِثُونَ الْفِرْدَوْسَ",
          "invocation_transliteration": "Allahumma ajilni min al-ladhina yarithuna al-firdaws",
          "invocation_francais": "Ô Allah, fais de moi parmi ceux qui hériteront du Paradis",
          "raison": "Demandé pour obtenir une place au Paradis, notamment au niveau du Firdaws, le plus haut niveau du Paradis."
        }
      ]
    },
    {
      "title": "Invocations pour la santé",
      "invocations": [
        {
          "invocation_arabe": "اللّهُمَّ عَافِنِي مِنْ كُلِّ دَاءٍ",
          "invocation_transliteration": "Allahumma 'afini min kulli da'",
          "invocation_francais": "Ô Allah, accorde-moi la guérison de toutes les maladies",
          "raison": "Demandé pour obtenir la guérison et la protection contre les maladies."
        },
        {
          "invocation_arabe": "اللّهُمَّ اشْفِنِي شِفَاءً تَامًّا",
          "invocation_transliteration": "Allahumma ishinni shifa'an tammam",
          "invocation_francais": "Ô Allah, accorde-moi une guérison complète",
          "raison": "Demandé pour obtenir une guérison complète et durable."
        },
        {
          "invocation_arabe": "اللّهُمَّ أَذْهِبْ عَنِّي الْأَذَى",
          "invocation_transliteration": "Allahumma adhhib 'anni al-atha",
          "invocation_francais": "Ô Allah, éloigne de moi toute douleur",
          "raison": "Demandé pour se débarrasser de la douleur et des souffrances."
        },
        {
          "invocation_arabe": "اللّهُمَّ اجْعَلْنِي مِنَ الْمُعَافِينَ",
          "invocation_transliteration": "Allahumma ajilni min al-mu'afina",
          "invocation_francais": "Ô Allah, fais de moi parmi les en bonne santé",
          "raison": "Demandé pour obtenir une bonne santé et le bien-être."
        },
        {
          "invocation_arabe": "اللّهُمَّ نَجِّنِي مِنْ كُلِّ مَرَضٍ",
          "invocation_transliteration": "Allahumma najini min kulli marad",
          "invocation_francais": "Ô Allah, protège-moi de toute maladie",
          "raison": "Demandé pour se protéger de toutes les maladies."
        }
      ]
    },
    {
      "title": "Invocations pour la guidance",
      "invocations": [
        {
          "invocation_arabe": "اللّهُمَّ اهْدِنِي إِلَى الْحَقِّ",
          "invocation_transliteration": "Allahumma ihdini ila al-haqq",
          "invocation_francais": "Ô Allah, guide-moi vers la vérité",
          "raison": "Demandé pour obtenir la guidance vers le droit chemin et la vérité."
        },
        {
          "invocation_arabe": "اللّهُمَّ اجْعَلْنِي مِنَ الْمُهْتَدِينَ",
          "invocation_transliteration": "Allahumma ajilni min al-muhtadine",
          "invocation_francais": "Ô Allah, fais de moi parmi les bien-guidés",
          "raison": "Demandé pour être guidé correctement dans la vie."
        },
        {
          "invocation_arabe": "اللّهُمَّ عَلِّمْنِي مَا جَهِلْتُ",
          "invocation_transliteration": "Allahumma 'allimni ma jahiltu",
          "invocation_francais": "Ô Allah, enseigne-moi ce que j’ignore",
          "raison": "Demandé pour obtenir la connaissance et l'enseignement nécessaires."
        },
        {
          "invocation_arabe": "اللّهُمَّ اجْعَلْنِي مِنَ الْعَارِفِينَ",
          "invocation_transliteration": "Allahumma ajilni min al-'arifin",
          "invocation_francais": "Ô Allah, fais de moi parmi les connaisseurs",
          "raison": "Demandé pour obtenir une compréhension plus profonde de la foi et des enseignements d'Allah."
        },
        {
          "invocation_arabe": "اللّهُمَّ اجْعَلْ قَلْبِي مُتَوَكِّلًا عَلَيْكَ",
          "invocation_transliteration": "Allahumma ajil qalbi mutawakkilan 'alayk",
          "invocation_francais": "Ô Allah, fais de mon cœur un cœur qui Te fait confiance",
          "raison": "Demandé pour renforcer la confiance en Allah et la foi."
        }
      ]
    },
    {
      "title": "Invocations pour la famille",
      "invocations": [
        {
          "invocation_arabe": "اللّهُمَّ اجْعَلْ أُسْرَتِي مُبَارَكَةً",
          "invocation_transliteration": "Allahumma ajil usraty mubarakatan",
          "invocation_francais": "Ô Allah, fais que ma famille soit bénie",
          "raison": "Demandé pour obtenir des bénédictions pour sa famille."
        },
        {
          "invocation_arabe": "اللّهُمَّ اجْعَلْنَا مِنَ الْمُتَّقِينَ",
          "invocation_transliteration": "Allahumma ajilna min al-muttaqin",
          "invocation_francais": "Ô Allah, fais de nous parmi les pieux",
          "raison": "Demandé pour que toute la famille soit pieuse et craigne Allah."
        },
        {
          "invocation_arabe": "اللّهُمَّ احْفَظْ أَهْلِي مِنَ الشَّيَاطِينِ",
          "invocation_transliteration": "Allahumma ahfaz ahli min ash-shayatin",
          "invocation_francais": "Ô Allah, protège ma famille des démons",
          "raison": "Demandé pour obtenir la protection de sa famille contre les influences malignes."
        },
        {
          "invocation_arabe": "اللّهُمَّ أَصْلِحْ بَيْنِي وَبَيْنَ أَهْلِي",
          "invocation_transliteration": "Allahumma aslih bayni wa bayna ahli",
          "invocation_francais": "Ô Allah, réconcilie-moi avec ma famille",
          "raison": "Demandé pour résoudre les conflits et améliorer les relations familiales."
        },
        {
          "invocation_arabe": "اللّهُمَّ أَدْخِلْنِي وَأَهْلِي الْجَنَّةَ",
          "invocation_transliteration": "Allahumma adkhilni wa ahli al-jannah",
          "invocation_francais": "Ô Allah, fais entrer ma famille et moi au Paradis",
          "raison": "Demandé pour obtenir le Paradis pour soi-même et sa famille."
        }
      ]
    },
    {
      "title": "Invocations pour les voyages",
      "invocations": [
        {
          "invocation_arabe": "اللّهُمَّ سَهِّلْ لَنَا سُبُلَ السَّفَرِ",
          "invocation_transliteration": "Allahumma sahil lana subul as-safar",
          "invocation_francais": "Ô Allah, facilite-nous les voies du voyage",
          "raison": "Demandé pour que le voyage soit facile et sans obstacles."
        },
        {
          "invocation_arabe": "اللّهُمَّ احْفَظْنَا فِي سَفَرِنَا",
          "invocation_transliteration": "Allahumma ahfazna fi safarina",
          "invocation_francais": "Ô Allah, protège-nous durant notre voyage",
          "raison": "Demandé pour obtenir la protection pendant le voyage."
        },
        {
          "invocation_arabe": "اللّهُمَّ اجْعَلْ سَفَرَنَا آمِنًا",
          "invocation_transliteration": "Allahumma ajil safarana aminan",
          "invocation_francais": "Ô Allah, rends notre voyage sûr",
          "raison": "Demandé pour que le voyage soit sûr et sans danger."
        },
        {
          "invocation_arabe": "اللّهُمَّ أَذْهِبْ عَنِّي الْوَحْشَةَ",
          "invocation_transliteration": "Allahumma adhhib 'anni al-wahshah",
          "invocation_francais": "Ô Allah, éloigne de moi la solitude",
          "raison": "Demandé pour se débarrasser du sentiment de solitude en voyage."
        },
        {
          "invocation_arabe": "اللّهُمَّ اجْعَلْنِي مِنَ الْمُسْتَجَابِينَ",
          "invocation_transliteration": "Allahumma ajilni min al-mustajabin",
          "invocation_francais": "Ô Allah, fais de moi parmi ceux dont les prières sont exaucées",
          "raison": "Demandé pour que les prières en voyage soient acceptées."
        }
      ]
    },
    {
      "title": "Invocations pour les épreuves",
      "invocations": [
        {
          "invocation_arabe": "اللّهُمَّ خُذْ بِيَدِي فِي الْمِحَنِ",
          "invocation_transliteration": "Allahumma khudh bi-yadi fi al-mihan",
          "invocation_francais": "Ô Allah, prends-moi par la main dans les épreuves",
          "raison": "Demandé pour obtenir le soutien d'Allah pendant les moments difficiles."
        },
        {
          "invocation_arabe": "اللّهُمَّ صَبِّرْنِي عَلَى الْبَلَاءِ",
          "invocation_transliteration": "Allahumma sabbirni 'ala al-bala",
          "invocation_francais": "Ô Allah, donne-moi la patience face à l'épreuve",
          "raison": "Demandé pour obtenir la patience lors des difficultés."
        },
        {
          "invocation_arabe": "اللّهُمَّ اجْعَلْ لِي مِنْ كُلِّ ضِيقٍ مَخْرَجًا",
          "invocation_transliteration": "Allahumma ajil li min kulli diqin makhrajan",
          "invocation_francais": "Ô Allah, accorde-moi une issue à chaque difficulté",
          "raison": "Demandé pour obtenir des solutions aux problèmes et difficultés."
        },
        {
          "invocation_arabe": "اللّهُمَّ قَوِّنِي عَلَى الْمِحَنِ",
          "invocation_transliteration": "Allahumma qawwinni 'ala al-mihan",
          "invocation_francais": "Ô Allah, renforce-moi pour affronter les épreuves",
          "raison": "Demandé pour obtenir la force nécessaire pour surmonter les épreuves."
        },
        {
          "invocation_arabe": "اللّهُمَّ إِنِّي أَشْكُو إِلَيْكَ",
          "invocation_transliteration": "Allahumma inni ashku ilayk",
          "invocation_francais": "Ô Allah, je Te fais part de ma plainte",
          "raison": "Demandé pour exprimer ses difficultés et demander l'aide d'Allah."
        }
      ]
    },
    {
      "title": "Invocations pour le succès",
      "invocations": [
        {
          "invocation_arabe": "اللّهُمَّ سَهِّلْ لِي أُمُورِي",
          "invocation_transliteration": "Allahumma sahil li umuri",
          "invocation_francais": "Ô Allah, facilite mes affaires",
          "raison": "Demandé pour obtenir des facilités dans ses projets et entreprises."
        },
        {
          "invocation_arabe": "اللّهُمَّ اجْعَلْنِي مِنَ النَّاجِحِينَ",
          "invocation_transliteration": "Allahumma ajilni min an-najihin",
          "invocation_francais": "Ô Allah, fais de moi parmi les réussis",
          "raison": "Demandé pour obtenir le succès dans ses efforts et ses objectifs."
        },
        {
          "invocation_arabe": "اللّهُمَّ ارزُقْنِي التَّفَوُّقَ",
          "invocation_transliteration": "Allahumma ruzuqni at-tafawuq",
          "invocation_francais": "Ô Allah, accorde-moi l'excellence",
          "raison": "Demandé pour obtenir l'excellence dans ses études ou ses tâches."
        },
        {
          "invocation_arabe": "اللّهُمَّ بَارِكْ لِي فِي عَمَلِي",
          "invocation_transliteration": "Allahumma barik li fi 'amali",
          "invocation_francais": "Ô Allah, bénis mon travail",
          "raison": "Demandé pour obtenir des bénédictions et du succès dans son travail."
        },
        {
          "invocation_arabe": "اللّهُمَّ اجْعَلْنِي مِنَ الْمُوفَّقِينَ",
          "invocation_transliteration": "Allahumma ajilni min al-muwafiqin",
          "invocation_francais": "Ô Allah, fais de moi parmi les personnes chanceuses",
          "raison": "Demandé pour obtenir la chance et le succès dans les entreprises."
        }
      ]
    },
    {
      "title": "Invocations pour la prospérité",
      "invocations": [
        {
          "invocation_arabe": "اللّهُمَّ اجْعَلْنِي غَنِيًّا بِبَرَكَتِكَ",
          "invocation_transliteration": "Allahumma ajilni ghaniyyan bi barakatika",
          "invocation_francais": "Ô Allah, rends-moi riche par Ta bénédiction",
          "raison": "Demandé pour obtenir la richesse et la prospérité grâce aux bénédictions d'Allah."
        },
        {
          "invocation_arabe": "اللّهُمَّ أَغْنِنِي عَنْ النَّاسِ",
          "invocation_transliteration": "Allahumma aghnini 'an an-nas",
          "invocation_francais": "Ô Allah, rends-moi indépendant des autres",
          "raison": "Demandé pour obtenir l'indépendance financière et la prospérité."
        },
        {
          "invocation_arabe": "اللّهُمَّ اجْعَلْنِي مِنَ الْمُبَارَكِينَ",
          "invocation_transliteration": "Allahumma ajilni min al-mubarakina",
          "invocation_francais": "Ô Allah, fais de moi parmi les personnes bénies",
          "raison": "Demandé pour obtenir des bénédictions et la prospérité dans tous les aspects de la vie."
        },
        {
          "invocation_arabe": "اللّهُمَّ زِدْنِي مِنْ خَيْرِكَ",
          "invocation_transliteration": "Allahumma zidni min khayrika",
          "invocation_francais": "Ô Allah, augmente-moi Tes bienfaits",
          "raison": "Demandé pour recevoir encore plus de bienfaits et de prospérité."
        },
        {
          "invocation_arabe": "اللّهُمَّ يَسِّرْ لِي كُلَّ خَيْرٍ",
          "invocation_transliteration": "Allahumma yassir li kull khayr",
          "invocation_francais": "Ô Allah, facilite-moi tout bien",
          "raison": "Demandé pour que les aspects positifs et bénéfiques de la vie soient facilitants."
        }
      ]
    },
    {
      "title": "Invocations pour la sagesse",
      "invocations": [
        {
          "invocation_arabe": "اللّهُمَّ زِدْنِي حِكْمَةً",
          "invocation_transliteration": "Allahumma zidni hikmatan",
          "invocation_francais": "Ô Allah, accorde-moi davantage de sagesse",
          "raison": "Demandé pour obtenir une sagesse accrue dans les décisions et actions."
        },
        {
          "invocation_arabe": "اللّهُمَّ اجْعَلْنِي مِنَ الْحَكِيمِينَ",
          "invocation_transliteration": "Allahumma ajilni min al-hakimin",
          "invocation_francais": "Ô Allah, fais de moi parmi les sages",
          "raison": "Demandé pour devenir une personne sage et avisée."
        },
        {
          "invocation_arabe": "اللّهُمَّ عَمِّقْ فَهْمِي",
          "invocation_transliteration": "Allahumma 'amiq fahmi",
          "invocation_francais": "Ô Allah, approfondis ma compréhension",
          "raison": "Demandé pour obtenir une meilleure compréhension des choses."
        },
        {
          "invocation_arabe": "اللّهُمَّ اجْعَلْ لِي مَفَاتِيحَ الْعِلْمِ",
          "invocation_transliteration": "Allahumma ajil li mafatiha al-ilm",
          "invocation_francais": "Ô Allah, donne-moi les clés de la connaissance",
          "raison": "Demandé pour accéder à la connaissance et à la sagesse."
        },
        {
          "invocation_arabe": "اللّهُمَّ عَلِّمْنِي مَا يُفِيدُنِي",
          "invocation_transliteration": "Allahumma 'allimni ma yufiduni",
          "invocation_francais": "Ô Allah, enseigne-moi ce qui est bénéfique",
          "raison": "Demandé pour obtenir des connaissances utiles et bénéfiques."
        }
      ]
    }
  ]
  ;

  ngOnInit() {
    this.categories = this.invocationsData;
  }

  getInvocations(title: string) {
    const category = this.categories.find(cat => cat.title === title);
    return category ? category.invocations : [];
  }

  onCategoryChange() {
    // Logic when category changes, if needed
  }
}

