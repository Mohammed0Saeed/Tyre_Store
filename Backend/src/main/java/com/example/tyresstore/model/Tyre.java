package com.example.tyresstore.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Entity
@Table
@Data
@NoArgsConstructor
public class Tyre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer height;
    private Integer width;
    private Integer diameter;
    private String ImgSrc;

    // to store the enum as string in the database
    @Enumerated(EnumType.STRING)
    private Season season;

    public Tyre(Integer height, Integer width, Integer diameter, String ImgSrc, Season season) {
        this.height = height;
        this.width = width;
        this.diameter = diameter;
        this.ImgSrc = ImgSrc;
        this.season = season;
    }
}