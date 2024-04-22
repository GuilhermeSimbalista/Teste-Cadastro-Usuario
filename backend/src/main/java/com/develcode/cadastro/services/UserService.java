package com.develcode.cadastro.services;

import com.develcode.cadastro.dtos.UserRequestDTO;
import com.develcode.cadastro.dtos.UserResponseDTO;
import com.develcode.cadastro.entities.User;
import com.develcode.cadastro.repositories.UserRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;

    private static final String DIRECTORY = "src/main/resources/uploads/";

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    public void saveUser(UserRequestDTO userRequestDTO, MultipartFile photo) throws IOException {
        User user = mapToEntity(userRequestDTO);
        String photoPath = saveFile(photo);
        user.setPhoto(photoPath);
        userRepository.save(user);
    }

    public List<UserResponseDTO> getAllUsers() {
        Sort sort = Sort.by(Sort.Direction.ASC, "code");
        return userRepository.findAll(sort).stream().map(this::mapToDTO).toList();
    }

    public void updateUser(Long id, UserRequestDTO userRequestDTO, MultipartFile photo) throws IOException {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        user.setName(userRequestDTO.name());
        user.setBirthDate(LocalDate.parse(userRequestDTO.birthDate(), formatter));
        String photoPath = saveFile(photo);
        user.setPhoto(photoPath);
        userRepository.save(user);
    }

    public void deleteUser(Long id){
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        Path photoPath = Paths.get(DIRECTORY + user.getPhoto());
        try {
            Files.deleteIfExists(photoPath);
        } catch (IOException e) {
            try {
                throw new IOException(e.getMessage());
            } catch (IOException ex) {
                throw new RuntimeException(ex);
            }
        }
        userRepository.deleteById(id);
    }

    private UserResponseDTO mapToDTO(User user) {
        return new UserResponseDTO(user.getCode(), user.getName(), user.getBirthDate().format(formatter), user.getPhoto());
    }

    private User mapToEntity(UserRequestDTO userRequest) {
        return new User(userRequest.name(), LocalDate.parse(userRequest.birthDate(), formatter));
    }

    private String saveFile(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new IllegalStateException("Cannot save an empty file.");
        }

        Path uploadPath = Paths.get(DIRECTORY);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        String originalFilename = file.getOriginalFilename();
        String fileExtension = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }
        String filename = UUID.randomUUID().toString() + fileExtension;

        Path filePath = uploadPath.resolve(filename);
        file.transferTo(filePath);

        return filename;
    }
}
