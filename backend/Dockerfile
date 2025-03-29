FROM eclipse-temurin:21-jdk-alpine

VOLUME /tmp

WORKDIR /app

COPY target/securecapita-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]
