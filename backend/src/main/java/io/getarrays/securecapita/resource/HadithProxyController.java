package io.getarrays.securecapita.resource;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/hadith")
public class HadithProxyController {
//http://localhost:8080/api/hadith/api/v1/categories/list/?language=fr
    private final RestTemplate restTemplate = new RestTemplate();

    private final String BASE_URL = "https://hadeethenc.com";

    @GetMapping("/categories")
    public ResponseEntity<String> getCategories() {
        String url = BASE_URL + "/api/v1/categories/list/?language=fr";
        return ResponseEntity.ok(restTemplate.getForObject(url, String.class));
    }
    //https://hadeethenc.com/api/v1/categories/list/?language=fr

    @GetMapping("/list")
    public ResponseEntity<String> getHadithList(@RequestParam int category_id) {
        String url = BASE_URL + "/api/v1/hadeeths/list/?language=fr&category_id=" + category_id + "&page=1&per_page=5000";
        return ResponseEntity.ok(restTemplate.getForObject(url, String.class));
    }

    @GetMapping("/detail")
    public ResponseEntity<String> getHadithDetail(@RequestParam int id) {
        String url = BASE_URL + "/api/v1/hadeeths/one/?language=fr&id=" + id;
        return ResponseEntity.ok(restTemplate.getForObject(url, String.class));
    }
    //"https://hadeethenc.com/api/v1/hadeeths/list/?language=fr&category_id=1&page=1&per_page=5000"
    //"https://hadeethenc.com/api/v1/hadeeths/one/?language=fr&id=5907"
}

