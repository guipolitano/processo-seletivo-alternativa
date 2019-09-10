
export default function Erros(erro){
    if(erro === "auth/user-not-found") {
        return "Usuário não encontrado, tente novamente!";
    }
    if(erro === "auth/wrong-password"){
        return "Senha incorreta, tente novamente!";
    }
    if(erro === "storage/unknown"){
        return "Ocorreu um erro desconhecido!";
    }
    if(erro === "storage/object-not-found"){
        return "Nenhum objeto na referência desejada!";
    }
    if(erro === "video/mp4"){
        return "Formato não suportado, utilize somente formato .mp4!";
    }
    if(erro === "storage/bucket-not-found"){
        return "Nenhum intervalo configurado para o Cloud Storage!";
    }
    if(erro === "storage/project-not-found"){
        return "Nenhum projeto configurado para o Cloud Storage!";
    }
    if(erro === "storage/quota-exceeded"){
        return "A cota do intervalo do Cloud Storage foi excedida. Se você estiver no nível gratuito, faça upgrade para um plano pago. Se você estiver em um plano pago, entre em contato com o suporte do Firebase!";
    }
    if(erro === "storage/unauthenticated"){
        return "O usuário não está autenticado. Faça a autenticação e tente novamente!";
    }
    if(erro === "storage/unauthorized"){
        return "O usuário não está autorizado a executar a ação desejada. Verifique suas regras de segurança para garantir que estejam corretas!";
    }
    if(erro === "storage/retry-limit-exceeded"){
        return "O limite máximo de tempo em uma operação (upload, download, exclusão etc.) foi excedido. Envie novamente!";
    }
    if(erro === "storage/invalid-checksum"){
        return "O arquivo no cliente não corresponde à soma de verificação do arquivo recebido pelo servidor. Envie novamente!";
    }
    if(erro === "storage/canceled"){
        return "O usuário cancelou a operação!";
    }
    if(erro === "storage/invalid-event-name"){
        return "Nome inválido do evento fornecido. Deve ser um de [`running`, `progress`, `pause`]!";
    }
    if(erro === "storage/invalid-url"){
        return "URL inválido fornecido a refFromURL(). Deve estar no formato: gs://bucket/object ou https://firebasestorage.googleapis.com/v0/b/bucket/o/object?token=&ltTOKEN!";
    }
    if(erro === "storage/invalid-argument"){
        return "O argumento transmitido a put() deve ser matriz `File`, `Blob` ou `UInt8`. O argumento transmitido a putString() deve ser string bruta `Base64` ou `Base64URL`!";
    }
    if(erro === "storage/no-default-bucket"){
        return "Nenhum intervalo foi configurado na propriedade storageBucket da sua configuração!";
    }
    if(erro === "storage/cannot-slice-blob"){
        return "Em geral, isso ocorre normalmente quando o arquivo local é alterado (excluído, salvo novamente etc.). Tente fazer o upload novamente após verificar que o arquivo não foi alterado!";
    }
    if(erro === "storage/server-file-wrong-size"){
        return "O arquivo no cliente não corresponde ao tamanho do arquivo recebido pelo servidor. Envie novamente!";
    }
}