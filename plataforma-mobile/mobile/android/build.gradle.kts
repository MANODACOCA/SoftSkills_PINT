buildscript {
  repositories {
    google()
    mavenCentral()
  }
  dependencies {
    // Plugin do Google Services para Firebase (Kotlin DSL)
    classpath("com.google.gms:google-services:4.4.3")
  }
}

allprojects {
  repositories {
    google()
    mavenCentral()
  }
}

// Se você já está declarando o plugin assim, pode até remover o buildscript acima:
//plugins {
//  id("com.google.gms.google-services") version "4.4.3" apply false
//}

val newBuildDir: Directory = rootProject
  .layout
  .buildDirectory
  .dir("../../build")
  .get()
rootProject.layout.buildDirectory.value(newBuildDir)

subprojects {
  val newSubprojectBuildDir: Directory = newBuildDir.dir(project.name)
  project.layout.buildDirectory.value(newSubprojectBuildDir)
  evaluationDependsOn(":app")
}

tasks.register<Delete>("clean") {
  delete(rootProject.layout.buildDirectory)
}