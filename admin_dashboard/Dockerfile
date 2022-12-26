FROM openjdk:17.0.1
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar", "--spring.rabbitmq.host=rabbitmq"]
