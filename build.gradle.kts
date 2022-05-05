import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    id("org.springframework.boot") version "2.6.7"
    id("io.spring.dependency-management") version "1.0.11.RELEASE"
    kotlin("jvm") version "1.6.21"
    kotlin("plugin.spring") version "1.6.21"
    kotlin("plugin.jpa") version "1.6.21"
}

group = "org.hobro"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_11

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-batch")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("mysql:mysql-connector-java")
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
    implementation("io.springfox:springfox-boot-starter:3.0.0")
    implementation("io.springfox:springfox-swagger-ui:3.0.0")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.springframework.batch:spring-batch-test")
}

tasks.withType<KotlinCompile> {
    kotlinOptions {
        freeCompilerArgs = listOf("-Xjsr305=strict")
        jvmTarget = "11"
    }
}

tasks.withType<Test> {
    useJUnitPlatform()
}

val frontendDir = "$projectDir/web"

sourceSets {
    main {
        resources {
            srcDirs("$projectDir/src/main/resources")
        }
    }
}

tasks {
    withType<ProcessResources> {
        dependsOn("copyReactBuildFiles")
        duplicatesStrategy = org.gradle.api.file.DuplicatesStrategy.EXCLUDE
    }
}

task<Exec>("installReact") {
    workingDir(frontendDir)
    group = BasePlugin.BUILD_GROUP
    inputs.dir(frontendDir)

    commandLine("npm", "install")
}

task<Exec>("buildReact") {
    dependsOn("installReact")
    workingDir(frontendDir)
    group = BasePlugin.BUILD_GROUP
    inputs.dir(frontendDir)

    commandLine("npm", "run-script", "build")
}

task<Copy>("copyReactBuildFiles") {
    dependsOn("buildReact")
    from("$frontendDir/build")
    into("$projectDir/src/main/resources/static")
}


