pipeline {
    agent any

    environment {
        DOCKERHUB_USER = credentials('dockerhub-username')
        DOCKERHUB_PSW  = credentials('dockerhub-password')
        DOCKER_IMAGE = "${DOCKERHUB_USER}/jenkins-demo"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Suhas0448/DEVOPSPROJECT.git'
            }
        }

        stage('Docker Build') {
            steps {
                bat """
                docker build -t %DOCKER_IMAGE%:latest .
                """
            }
        }

        stage('Docker Login & Push') {
            steps {
                bat """
                echo %DOCKERHUB_PSW% | docker login -u %DOCKERHUB_USER% --password-stdin
                docker push %DOCKER_IMAGE%:latest
                """
            }
        }
    }

    post {
        success {
            emailext(
                to: "example@gmail.com",
                subject: "Build SUCCESS",
                body: "Pipeline executed successfully!"
            )
        }
        failure {
            emailext(
                to: "example@gmail.com",
                subject: "Build FAILED",
                body: "Pipeline failed!"
            )
        }
    }
}
