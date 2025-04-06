package io.getarrays.securecapita.resource;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/quran")
public class QuranProxyController {

    private final RestTemplate restTemplate = new RestTemplate();

    @GetMapping("/surah")
    public ResponseEntity<String> getAllSurahs() {
        String url = "https://api.alquran.cloud/v1/surah";
        return ResponseEntity.ok(restTemplate.getForObject(url, String.class));
    }

    //http://localhost:8080/api/quran/surah/1/editions/ar.hudhaify,en.transliteration,fr.leclerc,fr.hamidullah
    @GetMapping("/surah/{id}")
    public ResponseEntity<String> getSurahById(
            @PathVariable int id
    ) {
        String url = "https://api.alquran.cloud/v1/surah/" + id + "/editions/ar.hudhaify,en.transliteration,fr.leclerc,fr.hamidullah";
        return ResponseEntity.ok(restTemplate.getForObject(url, String.class));
    }
    //https://api.alquran.cloud/v1/surah/1/editions/ar.hudhaify,en.transliteration,fr.leclerc,fr.hamidullah
}

