package com.hrms.entity;

import jakarta.persistence.*;
import java.util.Date;
@Entity
@Table(name = "events")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    @Column(name = "event_date", nullable = false)
    private String eventDate; // String type date

    // Constructors
    public Event() {}

    public Event(String title, String description, String eventDate) {
        this.title = title;
        this.description = description;
        this.eventDate = eventDate;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getEventDate() { return eventDate; } // ✅ Make sure this exists
    public void setEventDate(String eventDate) { this.eventDate = eventDate; }
}
